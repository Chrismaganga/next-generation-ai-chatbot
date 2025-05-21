"use client";
import { useState, useEffect } from 'react';
import { FaPalette, FaFont, FaImage, FaUpload } from 'react-icons/fa';

interface ResumeSettingsProps {
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
    };
    onSettingsChange: (settings: any) => void;
}

const FONT_FAMILIES = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Calibri', label: 'Calibri' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Helvetica', label: 'Helvetica' },
];

const FONT_SIZES = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
];

const LAYOUTS = [
    { value: 'modern', label: 'Modern' },
    { value: 'classic', label: 'Classic' },
    { value: 'minimal', label: 'Minimal' },
];

const SPACING_OPTIONS = [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'spacious', label: 'Spacious' },
];

const IMAGE_SIZES = [
    { value: 'small', label: 'Small (100px)' },
    { value: 'medium', label: 'Medium (150px)' },
    { value: 'large', label: 'Large (200px)' },
];

const IMAGE_POSITIONS = [
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'center', label: 'Center' },
];

export default function ResumeSettings({ settings, onSettingsChange }: ResumeSettingsProps) {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('colors');

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (key: string, value: string) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
            <div className="flex items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Resume Settings</h3>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('colors')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'colors'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <FaPalette />
                    <span>Colors</span>
                </button>
                <button
                    onClick={() => setActiveTab('typography')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'typography'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <FaFont />
                    <span>Typography</span>
                </button>
                <button
                    onClick={() => setActiveTab('layout')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'layout'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <FaImage />
                    <span>Layout</span>
                </button>
            </div>

            {/* Settings Content */}
            <div className="space-y-6">
                {activeTab === 'colors' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Primary Color
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={settings.primaryColor}
                                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                                    className="w-12 h-12 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={settings.primaryColor}
                                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                                    className="flex-1 bg-gray-700 text-white rounded-lg p-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Secondary Color
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={settings.secondaryColor}
                                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                    className="w-12 h-12 rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={settings.secondaryColor}
                                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                    className="flex-1 bg-gray-700 text-white rounded-lg p-2"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'typography' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Font Family
                            </label>
                            <select
                                value={settings.fontFamily}
                                onChange={(e) => handleChange('fontFamily', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                            >
                                {FONT_FAMILIES.map((font) => (
                                    <option key={font.value} value={font.value}>
                                        {font.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Font Size
                            </label>
                            <select
                                value={settings.fontSize}
                                onChange={(e) => handleChange('fontSize', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                            >
                                {FONT_SIZES.map((size) => (
                                    <option key={size.value} value={size.value}>
                                        {size.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Header Size
                            </label>
                            <select
                                value={settings.headerSize}
                                onChange={(e) => handleChange('headerSize', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                            >
                                {FONT_SIZES.map((size) => (
                                    <option key={size.value} value={size.value}>
                                        {size.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'layout' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Layout Style
                            </label>
                            <select
                                value={settings.layout}
                                onChange={(e) => handleChange('layout', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                            >
                                {LAYOUTS.map((layout) => (
                                    <option key={layout.value} value={layout.value}>
                                        {layout.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Spacing
                            </label>
                            <select
                                value={settings.spacing}
                                onChange={(e) => handleChange('spacing', e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-2"
                            >
                                {SPACING_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center space-x-2 text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={settings.showProfileImage}
                                    onChange={(e) => handleChange('showProfileImage', e.target.checked.toString())}
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                />
                                <span>Show Profile Image</span>
                            </label>
                        </div>
                        {settings.showProfileImage && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Image Size
                                    </label>
                                    <select
                                        value={settings.profileImageSize}
                                        onChange={(e) => handleChange('profileImageSize', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg p-2"
                                    >
                                        {IMAGE_SIZES.map((size) => (
                                            <option key={size.value} value={size.value}>
                                                {size.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Image Position
                                    </label>
                                    <select
                                        value={settings.profileImagePosition}
                                        onChange={(e) => handleChange('profileImagePosition', e.target.value)}
                                        className="w-full bg-gray-700 text-white rounded-lg p-2"
                                    >
                                        {IMAGE_POSITIONS.map((position) => (
                                            <option key={position.value} value={position.value}>
                                                {position.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 