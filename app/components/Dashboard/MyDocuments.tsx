'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '@/app/utils/hooks/useLocale.js';
import { useUser } from '@/app/utils/hooks/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faTimesCircle, 
  faClock, 
  faUpload,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { mockDocuments, Document } from '@/app/utils/mocks/mockDocuments';
import { useFlashMessage } from '@/app/utils/hooks/useFlashMessage';

const content = {
  en: {
    title: "My Documents",
    uploadNew: "Upload New Document",
    status: {
      APPROVED: "Approved",
      REJECTED: "Rejected",
      PENDING: "Pending"
    },
    expires: "Expires",
    uploaded: "Uploaded",
    viewDocument: "View Document",
    uploadDocument: "Upload Document",
    chooseFile: "Choose File",
    noFile: "No file chosen",
    documentTypes: {
      CNI: "National ID Card",
      PERMIS: "Driver's License",
      CARTE_GRISE: "Vehicle Registration",
      ASSURANCE: "Insurance",
      CERTIFICAT_VISITE: "Technical Inspection",
      LICENCE_TRANSPORT: "Transport License"
    }
  },
  fr: {
    title: "Mes Documents",
    uploadNew: "Ajouter un Document",
    status: {
      APPROVED: "Approuvé",
      REJECTED: "Rejeté",
      PENDING: "En attente"
    },
    expires: "Expire le",
    uploaded: "Ajouté le",
    viewDocument: "Voir le Document",
    uploadDocument: "Ajouter le Document",
    chooseFile: "Choisir un fichier",
    noFile: "Aucun fichier choisi",
    documentTypes: {
      CNI: "Carte Nationale d'Identité",
      PERMIS: "Permis de Conduire",
      CARTE_GRISE: "Carte Grise",
      ASSURANCE: "Assurance",
      CERTIFICAT_VISITE: "Visite Technique",
      LICENCE_TRANSPORT: "Licence de Transport"
    }
  }
};

const MyDocuments = () => {
  const { locale } = useLocale();
  const { user } = useUser();
  const { showFlashMessage } = useFlashMessage();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<string>('');
  const localizedContent = content[locale as "fr" | "en"];

  useEffect(() => {
    if (user?.id) {
      const userDocs = mockDocuments[user.id] || [];
      setDocuments(userDocs);
    }
  }, [user?.id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadType) {
      showFlashMessage("Veuillez sélectionner un fichier et un type de document", "error", true);
      return;
    }

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newDoc: Document = {
      id: (documents.length + 1).toString(),
      type: uploadType as Document['type'],
      name: localizedContent.documentTypes[uploadType as keyof typeof localizedContent.documentTypes],
      description: "",
      status: "PENDING",
      uploadDate: new Date().toISOString().split('T')[0],
      imageUrl: URL.createObjectURL(selectedFile)
    };

    setDocuments([...documents, newDoc]);
    setSelectedFile(null);
    setUploadType('');
    showFlashMessage("Document ajouté avec succès", "success", true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'REJECTED':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />;
      case 'PENDING':
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{localizedContent.title}</h2>
        <button
          onClick={() => document.getElementById('fileInput')?.click()}
          className="bg-bleu-nuit text-white px-4 py-2 rounded-lg hover:bg-orange-btn transition-colors flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faUpload} />
          <span>{localizedContent.uploadNew}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.description}</p>
              </div>
              {getStatusIcon(doc.status)}
            </div>

            <div className="mb-4">
              <img 
                src={doc.imageUrl} 
                alt={doc.name}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-1 text-sm">
              <p className="text-gray-600">
                {localizedContent.uploaded}: {doc.uploadDate}
              </p>
              {doc.expiryDate && (
                <p className={`flex items-center space-x-1 ${isExpiringSoon(doc.expiryDate) ? 'text-orange-500' : 'text-gray-600'}`}>
                  {isExpiringSoon(doc.expiryDate) && (
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                  )}
                  <span>{localizedContent.expires}: {doc.expiryDate}</span>
                </p>
              )}
              {doc.status === 'REJECTED' && doc.rejectionReason && (
                <p className="text-red-500 text-sm">{doc.rejectionReason}</p>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => window.open(doc.imageUrl, '_blank')}
                className="text-bleu-nuit hover:text-orange-btn text-sm"
              >
                {localizedContent.viewDocument}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'upload caché */}
      <input
        id="fileInput"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{localizedContent.uploadDocument}</h3>
            
            <div className="mb-4">
              <select
                className="w-full p-2 border rounded"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
              >
                <option value="">-- Sélectionner le type --</option>
                {Object.entries(localizedContent.documentTypes).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {selectedFile.name}
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setUploadType('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleUpload}
                className="bg-bleu-nuit text-white px-4 py-2 rounded hover:bg-orange-btn transition-colors"
              >
                {localizedContent.uploadDocument}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDocuments;
