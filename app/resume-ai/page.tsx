"use client";
import { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaPlus, FaTrash, FaEdit, FaMagic, FaTimes, FaUser, FaCog, FaUpload, FaCamera } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeSettings from "../components/ResumeSettings";

interface ResumeSection {
    id: string;
    type: string;
    content: string;
}

interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    profileImage?: string;
}

const SECTION_TYPES = [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "interests",
    "achievements",
    "publications",
];

const DEFAULT_SETTINGS = {
    primaryColor: "#8B5CF6",
    secondaryColor: "#3B82F6",
    fontFamily: "Arial",
    fontSize: "medium",
    headerSize: "large",
    spacing: "comfortable",
    layout: "modern",
    showProfileImage: false,
    profileImageSize: "medium",
    profileImagePosition: "center",
};

export default function ResumeAI() {
    const { isSignedIn, user } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [showSettings, setShowSettings] = useState(false);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        profileImage: "",
    });
    const [sections, setSections] = useState<ResumeSection[]>([
        { id: "1", type: "summary", content: "" },
        { id: "2", type: "experience", content: "" },
        { id: "3", type: "education", content: "" },
        { id: "4", type: "skills", content: "" },
    ]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSections(items);
    };

    const generateAIContent = async (sectionId: string) => {
        setIsGenerating(true);
        try {
            const section = sections.find(s => s.id === sectionId);
            if (!section) return;

            const response = await fetch("/api/generate-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sectionType: section.type,
                    personalInfo,
                    prompt: `Generate professional content for the ${section.type} section of a resume for ${personalInfo.fullName}. Make it concise, professional, and impactful.`,
                }),
            });

            const data = await response.json();

            setSections(sections.map(s =>
                s.id === sectionId
                    ? { ...s, content: data.content }
                    : s
            ));
        } catch (error) {
            console.error("Error generating content:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const updateSectionContent = (sectionId: string, content: string) => {
        setSections(sections.map(s =>
            s.id === sectionId
                ? { ...s, content }
                : s
        ));
    };

    const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
        setPersonalInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addNewSection = () => {
        if (!selectedType) return;

        const newSection: ResumeSection = {
            id: Date.now().toString(),
            type: selectedType,
            content: "",
        };

        setSections([...sections, newSection]);
        setShowAddModal(false);
        setSelectedType("");
    };

    const deleteSection = (sectionId: string) => {
        setSections(sections.filter(s => s.id !== sectionId));
    };

    const getFontSizeClass = (size: string) => {
        switch (size) {
            case 'small': return 'text-sm';
            case 'medium': return 'text-base';
            case 'large': return 'text-lg';
            default: return 'text-base';
        }
    };

    const getSpacingClass = (spacing: string) => {
        switch (spacing) {
            case 'compact': return 'space-y-2';
            case 'comfortable': return 'space-y-4';
            case 'spacious': return 'space-y-6';
            default: return 'space-y-4';
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPersonalInfo(prev => ({
                    ...prev,
                    profileImage: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const getImageSizeClass = (size: string) => {
        switch (size) {
            case 'small': return 'w-24 h-24';
            case 'medium': return 'w-32 h-32';
            case 'large': return 'w-40 h-40';
            default: return 'w-32 h-32';
        }
    };

    const getImagePositionClass = (position: string) => {
        switch (position) {
            case 'left': return 'justify-start';
            case 'right': return 'justify-end';
            case 'center': return 'justify-center';
            default: return 'justify-center';
        }
    };

    if (!isSignedIn) {
        router.push("/sign-in");
        return null;
    }

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                        AI Resume Builder
                    </h1>
                    <p className="mt-4 text-xl text-gray-300">
                        Create a professional resume with AI assistance
                    </p>
                </div>

                {/* Settings Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <FaCog />
                        <span>Customize Resume</span>
                    </button>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <ResumeSettings
                        settings={settings}
                        onSettingsChange={setSettings}
                    />
                )}

                {/* Personal Information Section */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
                    <div className="flex items-center mb-4">
                        <FaUser className="text-purple-400 mr-2" />
                        <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Profile Image Upload */}
                        <div className="md:col-span-2">
                            <div className={`flex ${getImagePositionClass(settings.profileImagePosition)} mb-4`}>
                                <div className="relative">
                                    {personalInfo.profileImage ? (
                                        <div className="relative group">
                                            <img
                                                src={personalInfo.profileImage}
                                                alt="Profile"
                                                className={`${getImageSizeClass(settings.profileImageSize)} rounded-full object-cover border-2 border-purple-500`}
                                            />
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FaCamera className="text-white text-2xl" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`${getImageSizeClass(settings.profileImageSize)} flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors`}
                                        >
                                            <FaUpload className="text-gray-400 text-2xl" />
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={personalInfo.fullName}
                                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={personalInfo.email}
                                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                            <input
                                type="tel"
                                value={personalInfo.phone}
                                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                            <input
                                type="text"
                                value={personalInfo.location}
                                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="City, Country"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn (Optional)</label>
                            <input
                                type="url"
                                value={personalInfo.linkedin}
                                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="linkedin.com/in/username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Website (Optional)</label>
                            <input
                                type="url"
                                value={personalInfo.website}
                                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="www.example.com"
                            />
                        </div>
                    </div>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="resume-sections">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={getSpacingClass(settings.spacing)}
                            >
                                {sections.map((section, index) => (
                                    <Draggable
                                        key={section.id}
                                        draggableId={section.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-gray-800 rounded-lg p-6 shadow-lg"
                                                style={{
                                                    borderLeft: `4px solid ${settings.primaryColor}`,
                                                }}
                                            >
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3
                                                        className={`font-semibold text-white capitalize ${getFontSizeClass(settings.headerSize)}`}
                                                        style={{ color: settings.primaryColor }}
                                                    >
                                                        {section.type}
                                                    </h3>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => generateAIContent(section.id)}
                                                            disabled={isGenerating}
                                                            className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
                                                            title="Generate with AI"
                                                        >
                                                            <FaMagic />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteSection(section.id)}
                                                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={section.content}
                                                    onChange={(e) => updateSectionContent(section.id, e.target.value)}
                                                    className={`w-full h-32 bg-gray-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none ${getFontSizeClass(settings.fontSize)}`}
                                                    style={{ fontFamily: settings.fontFamily }}
                                                    placeholder={`Enter your ${section.type}...`}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <FaPlus />
                        <span>Add New Section</span>
                    </button>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
                    >
                        Preview Resume
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Add Section Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">Add New Section</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-300"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        >
                            <option value="">Select a section type</option>
                            {SECTION_TYPES.filter(type => !sections.some(s => s.type === type))
                                .map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                        </select>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 text-gray-400 hover:text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addNewSection}
                                disabled={!selectedType}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                            >
                                Add Section
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div
                        className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        style={{ fontFamily: settings.fontFamily }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`font-bold text-gray-900 ${getFontSizeClass(settings.headerSize)}`}>
                                Resume Preview
                            </h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className={getSpacingClass(settings.spacing)}>
                            {/* Personal Info in Preview */}
                            <div className="text-center border-b border-gray-200 pb-4">
                                {settings.showProfileImage && personalInfo.profileImage && (
                                    <div className={`flex ${getImagePositionClass(settings.profileImagePosition)} mb-4`}>
                                        <img
                                            src={personalInfo.profileImage}
                                            alt="Profile"
                                            className={`${getImageSizeClass(settings.profileImageSize)} rounded-full object-cover border-2`}
                                            style={{ borderColor: settings.primaryColor }}
                                        />
                                    </div>
                                )}
                                <h2
                                    className={`font-bold text-gray-900 ${getFontSizeClass(settings.headerSize)}`}
                                    style={{ color: settings.primaryColor }}
                                >
                                    {personalInfo.fullName}
                                </h2>
                                <div className={`flex justify-center space-x-4 text-gray-600 mt-2 ${getFontSizeClass(settings.fontSize)}`}>
                                    <span>{personalInfo.email}</span>
                                    <span>•</span>
                                    <span>{personalInfo.phone}</span>
                                    <span>•</span>
                                    <span>{personalInfo.location}</span>
                                </div>
                                {(personalInfo.linkedin || personalInfo.website) && (
                                    <div className={`flex justify-center space-x-4 text-gray-600 mt-2 ${getFontSizeClass(settings.fontSize)}`}>
                                        {personalInfo.linkedin && (
                                            <a
                                                href={personalInfo.linkedin}
                                                className="text-blue-600 hover:underline"
                                                style={{ color: settings.secondaryColor }}
                                            >
                                                LinkedIn
                                            </a>
                                        )}
                                        {personalInfo.website && (
                                            <a
                                                href={personalInfo.website}
                                                className="text-blue-600 hover:underline"
                                                style={{ color: settings.secondaryColor }}
                                            >
                                                Website
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* Resume Sections */}
                            {sections.map((section) => (
                                <div key={section.id} className="border-b border-gray-200 pb-4">
                                    <h4
                                        className={`font-semibold text-gray-900 capitalize mb-2 ${getFontSizeClass(settings.headerSize)}`}
                                        style={{ color: settings.primaryColor }}
                                    >
                                        {section.type}
                                    </h4>
                                    <p className={`text-gray-700 whitespace-pre-wrap ${getFontSizeClass(settings.fontSize)}`}>
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 