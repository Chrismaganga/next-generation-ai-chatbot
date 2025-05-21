export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export async function POST(req: Request) {
  try {
    const { sectionType, personalInfo, prompt } = await req.json();

    const systemPrompt = `You are a professional resume writer. Generate content for the ${sectionType} section of a resume for ${personalInfo.fullName}.
    
Personal Information:
- Name: ${personalInfo.fullName}
- Location: ${personalInfo.location}
${personalInfo.linkedin ? `- LinkedIn: ${personalInfo.linkedin}` : ''}
${personalInfo.website ? `- Website: ${personalInfo.website}` : ''}

Guidelines:
1. Make the content concise, professional, and impactful
2. Use action verbs and quantifiable achievements
3. Tailor the content to the section type
4. Maintain a consistent professional tone
5. Focus on relevant skills and experiences
6. Use industry-standard formatting and terminology`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating resume content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
} 