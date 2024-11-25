import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Upload, FolderOpen, FileText, Download } from 'lucide-react';

const Documents = () => {
  const documents = [
    {
      id: 1,
      name: 'Loan Application - Robert Chen',
      type: 'PDF',
      category: 'Applications',
      uploadedBy: 'Sarah Wilson',
      uploadDate: '2024-03-15',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Income Verification Documents',
      type: 'ZIP',
      category: 'Verification',
      uploadedBy: 'John Smith',
      uploadDate: '2024-03-14',
      size: '5.1 MB',
    },
    // Add more document entries...
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Document Management</h1>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Documents
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input className="pl-10" placeholder="Search documents..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                <FolderOpen className="w-4 h-4" />
                <span>All Documents</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                <FileText className="w-4 h-4" />
                <span>Applications</span>
              </a>
              {/* Add more categories */}
            </nav>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Uploaded By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {doc.category}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {doc.uploadedBy}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {doc.uploadDate}
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documents;