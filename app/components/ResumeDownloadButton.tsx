"use client";
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaDownload, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import ResumePDF from './ResumePDF';

interface ResumeDownloadButtonProps {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin?: string;
        website?: string;
        profileImage?: string;
    };
    sections: Array<{
        id: string;
        type: string;
        content: string;
    }>;
    settings: {
        primaryColor: string;
        secondaryColor: string;
        fontFamily: string;
        fontSize: string;
        headerSize: string;
        spacing: string;
        layout: string;
        showProfileImage: boolean;
        profileImageSize: string;
        profileImagePosition: string;
        textColors: {
            name: string;
            labels: string;
            values: string;
            sectionTitles: string;
            sectionContent: string;
            links: string;
        };
    };
    onDownloadComplete?: () => void;
}

const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({
    personalInfo,
    sections,
    settings,
    onDownloadComplete
}) => {
    return (
        <PDFDownloadLink
            document={
                <ResumePDF
                    personalInfo={personalInfo}
                    sections={sections}
                    settings={settings}
                />
            }
            fileName={`${personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            onClick={onDownloadComplete}
        >
            {({ loading }) => (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{loading ? 'Generating PDF...' : 'Download PDF'}</span>
                </>
            )}
        </PDFDownloadLink>
    );
};

export default ResumeDownloadButton; 