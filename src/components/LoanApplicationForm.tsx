import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  loanType: z.string().min(1, 'Loan type is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
  propertyAddress: z.string().min(1, 'Property address is required'),
});

const LoanApplicationForm = ({ onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onDrop = useCallback((acceptedFiles) => {
    const allowedTypes = [
      'application/pdf',
      'application/xml',
      'application/x-fnm',
      'application/x-mismo'
    ];
    
    const validFiles = acceptedFiles.filter(file => 
      allowedTypes.includes(file.type) || 
      file.name.endsWith('.fnm') || 
      file.name.endsWith('.xml')
    );

    if (validFiles.length !== acceptedFiles.length) {
      toast.error('Some files were rejected. Please upload only PDF, FNM 3.2, or MISMO 3.4 files.');
    }

    setDocuments(prev => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/xml': ['.xml'],
      'application/x-fnm': ['.fnm'],
    },
    maxSize: 25 * 1024 * 1024, // 25MB
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload documents first
      const documentRefs = await Promise.all(
        documents.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `loan-documents/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          return {
            name: file.name,
            path: filePath,
            type: file.type,
          };
        })
      );

      // Create loan application
      const { data: loan, error } = await supabase
        .from('loans')
        .insert([
          {
            borrower_first_name: data.firstName,
            borrower_last_name: data.lastName,
            borrower_email: data.email,
            borrower_phone: data.phone,
            loan_type: data.loanType,
            loan_amount: parseFloat(data.loanAmount),
            loan_purpose: data.loanPurpose,
            property_address: data.propertyAddress,
            status: 'pending',
            documents: documentRefs,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Loan application submitted successfully!');
      onSuccess(loan);
      onClose();
    } catch (error) {
      console.error('Error submitting loan application:', error);
      toast.error('Failed to submit loan application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader className="border-b bg-[#1a2b4c] text-white">
        <div className="flex justify-between items-center">
          <CardTitle>Add New Loan</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:text-white/80">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-gray-100">
            <TabsTrigger value="create" className="data-[state=active]:bg-[#1a2b4c] data-[state=active]:text-white">
              Create Manually
            </TabsTrigger>
            <TabsTrigger value="fnm" className="data-[state=active]:bg-[#1a2b4c] data-[state=active]:text-white">
              Import FNM 3.2 File
            </TabsTrigger>
            <TabsTrigger value="mismo" className="data-[state=active]:bg-[#1a2b4c] data-[state=active]:text-white">
              Import MISMO 3.4
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type *</Label>
              <Select onValueChange={value => register('loanType').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conventional">Conventional</SelectItem>
                  <SelectItem value="fha">FHA</SelectItem>
                  <SelectItem value="va">VA</SelectItem>
                  <SelectItem value="jumbo">Jumbo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount *</Label>
              <Input
                id="loanAmount"
                type="number"
                {...register('loanAmount')}
                error={errors.loanAmount?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanPurpose">Loan Purpose *</Label>
              <Select onValueChange={value => register('loanPurpose').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="cashout">Cash-out Refinance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyAddress">Property Address *</Label>
              <Input
                id="propertyAddress"
                {...register('propertyAddress')}
                error={errors.propertyAddress?.message}
              />
            </div>

            <div className="space-y-4">
              <Label>Documents</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 transition-colors hover:border-[#1a2b4c] cursor-pointer ${
                  isDragActive ? 'border-[#1a2b4c] bg-[#1a2b4c]/5' : 'border-gray-200'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-[#1a2b4c] mb-3" />
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-semibold text-[#1a2b4c]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, FNM 3.2 File (.fnm), MISMO 3.4 (.xml)
                  </p>
                  <p className="text-xs text-gray-500">Maximum file size: 25MB</p>
                </div>
              </div>

              {documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {documents.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDocuments(documents.filter((_, i) => i !== index));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-[#1a2b4c] text-[#1a2b4c] hover:bg-[#1a2b4c] hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1a2b4c] text-white hover:bg-[#1a2b4c]/90"
              >
                {isSubmitting ? 'Submitting...' : 'Create Application'}
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoanApplicationForm;