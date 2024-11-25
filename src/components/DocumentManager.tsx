import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { FileText, Upload, FolderOpen, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const DocumentManager = () => {
  const documents = [
    {
      id: 1,
      name: 'Loan Application.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploaded: '2024-03-15',
      status: 'Verified',
    },
    {
      id: 2,
      name: 'Pay Stubs.pdf',
      type: 'PDF',
      size: '1.8 MB',
      uploaded: '2024-03-14',
      status: 'Pending Review',
    },
    {
      id: 3,
      name: 'Bank Statements.pdf',
      type: 'PDF',
      size: '3.2 MB',
      uploaded: '2024-03-13',
      status: 'Verified',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input className="pl-10" placeholder="Search documents..." />
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Documents
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-4 hover:bg-gray-50 px-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.size} • Uploaded {doc.uploaded}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      doc.status === 'Verified'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {doc.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <FolderOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManager;