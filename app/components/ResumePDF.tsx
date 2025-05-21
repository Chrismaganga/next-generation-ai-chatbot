import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts
Font.register({
    family: 'Arial',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
    ]
});

// A4 page dimensions in points (1 point = 1/72 inch)
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

interface ResumePDFProps {
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
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Arial',
        backgroundColor: '#ffffff',
        width: A4_WIDTH,
        height: A4_HEIGHT,
    },
    header: {
        marginBottom: 20,
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: 15,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        marginLeft: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 4,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 9,
        width: 60,
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 9,
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    nameLabel: {
        fontSize: 9,
        width: 60,
        fontWeight: 'bold',
    },
    nameValue: {
        fontSize: 20,
        flex: 1,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: 'bold',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: 2,
    },
    sectionContent: {
        fontSize: 9,
        lineHeight: 1.3,
    },
    links: {
        fontSize: 9,
        marginTop: 4,
    },
    link: {
        marginBottom: 1,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 8,
        color: '#6b7280',
    },
});

const ResumePDF: React.FC<ResumePDFProps> = ({ personalInfo, sections, settings }) => {
    // Default settings if not provided
    const defaultSettings = {
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
        textColors: {
            name: "#1f2937",
            labels: "#4b5563",
            values: "#1f2937",
            sectionTitles: "#8B5CF6",
            sectionContent: "#1f2937",
            links: "#3B82F6",
        },
    };

    // Merge provided settings with defaults
    const mergedSettings = {
        ...defaultSettings,
        ...settings,
        textColors: {
            ...defaultSettings.textColors,
            ...(settings?.textColors || {}),
        },
    };

    // Group sections into two pages, prioritizing important sections for the first page
    const firstPageSections = sections.slice(0, 3); // Summary, Experience, Education
    const secondPageSections = sections.slice(3); // Remaining sections

    return (
        <Document>
            {/* First Page */}
            <Page size="A4" style={styles.page}>
                {/* Header with Personal Info */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerLeft}>
                            <View style={styles.nameRow}>
                                <Text style={[styles.nameLabel, { color: mergedSettings.textColors.labels }]}>Name:</Text>
                                <Text style={[styles.nameValue, { color: mergedSettings.textColors.name }]}>
                                    {personalInfo.fullName || ' '}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: mergedSettings.textColors.labels }]}>Email:</Text>
                                <Text style={[styles.infoValue, { color: mergedSettings.textColors.values }]}>
                                    {personalInfo.email || ' '}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: mergedSettings.textColors.labels }]}>Phone:</Text>
                                <Text style={[styles.infoValue, { color: mergedSettings.textColors.values }]}>
                                    {personalInfo.phone || ' '}
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: mergedSettings.textColors.labels }]}>Location:</Text>
                                <Text style={[styles.infoValue, { color: mergedSettings.textColors.values }]}>
                                    {personalInfo.location || ' '}
                                </Text>
                            </View>
                            {(personalInfo.linkedin || personalInfo.website) && (
                                <View style={styles.links}>
                                    {personalInfo.linkedin && (
                                        <View style={styles.infoRow}>
                                            <Text style={[styles.infoLabel, { color: mergedSettings.textColors.labels }]}>LinkedIn:</Text>
                                            <Text style={[styles.infoValue, { color: mergedSettings.textColors.links }]}>
                                                {personalInfo.linkedin || ' '}
                                            </Text>
                                        </View>
                                    )}
                                    {personalInfo.website && (
                                        <View style={styles.infoRow}>
                                            <Text style={[styles.infoLabel, { color: mergedSettings.textColors.labels }]}>Website:</Text>
                                            <Text style={[styles.infoValue, { color: mergedSettings.textColors.links }]}>
                                                {personalInfo.website || ' '}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                        {mergedSettings.showProfileImage && personalInfo.profileImage && (
                            <View style={styles.headerRight}>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <Image
                                    src={personalInfo.profileImage}
                                    style={styles.profileImage}
                                />
                            </View>
                        )}
                    </View>
                </View>

                {/* First Page Sections */}
                {firstPageSections.map((section) => (
                    <View key={section.id} style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: mergedSettings.textColors.sectionTitles }]}>
                            {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                        </Text>
                        <Text style={[styles.sectionContent, { color: mergedSettings.textColors.sectionContent }]}>
                            {section.content || ' '}
                        </Text>
                    </View>
                ))}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>

            {/* Second Page - Only render if there are additional sections */}
            {secondPageSections.length > 0 && (
                <Page size="A4" style={styles.page}>
                    {secondPageSections.map((section) => (
                        <View key={section.id} style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: mergedSettings.textColors.sectionTitles }]}>
                                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                            </Text>
                            <Text style={[styles.sectionContent, { color: mergedSettings.textColors.sectionContent }]}>
                                {section.content || ' '}
                            </Text>
                        </View>
                    ))}
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} fixed />
                </Page>
            )}
        </Document>
    );
};

export default ResumePDF; 