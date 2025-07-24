# AcePrep - AP Course AI Tutoring Platform

## Overview

AcePrep is an AI-powered educational platform that provides personalized tutoring for Advanced Placement (AP) courses using Retrieval Augmented Generation (RAG). The platform features a modern dark-themed interface with gradient backgrounds and glass morphism effects.

## Supported Courses

The platform currently supports eight AP courses:

1. **AP US History (APUSH)** - Complete with RAG data from apush-data.fixed.ts
2. **AP World History (APWH)** - Full tutor implementation
3. **AP European History (APEURO)** - Full tutor implementation  
4. **AP Environmental Science (APES)** - Full tutor implementation
5. **AP Macroeconomics (APMACRO)** - Full tutor implementation
6. **AP Microeconomics (APMICRO)** - Full tutor implementation
7. **AP Government & Politics (APGOV)** - Full tutor implementation
8. **AP Biology (APBIO)** - Full tutor implementation

## Technical Architecture

### Frontend
- React.js with TypeScript
- Wouter for routing
- TanStack Query for state management
- Tailwind CSS with custom theme
- Shadcn/ui component library

### Backend
- Express.js server
- Groq AI integration (using GROQ_API_KEY)
- In-memory storage for chat sessions
- RESTful API endpoints

### AI Integration
- **Groq AI** for chat completions (using llama3-70b-8192 model)
- Course-specific system prompts for each AP subject
- Temperature: 0.7, Max tokens: 800

## Recent Changes

**January 22, 2025:**
- ✅ **Precision unit search activation** - only triggers with BOTH keywords (overview/summary/about) AND unit patterns
- ✅ **Multi-unit range support** - handles "units 1-3" for comprehensive multi-unit summaries
- ✅ **Enhanced unit detection** - works across ALL courses with "unit" OR "period" keywords
- ✅ **Universal search patterns** - handles "Unit 1", "unit 1", "Period 4", "unit one", etc. for all AP courses
- ✅ **APUSH compatibility fixed** - searches both "unit" and "period" patterns to match APUSH data structure
- ✅ **Written number support** - converts "one", "two", "three" to digits automatically
- ✅ **Removed all search result limits** - now returns ALL matching content for any search
- ✅ **Complete curriculum access** - students get comprehensive results for all queries
- ✅ **Pure content instruction** - unit overviews show only curriculum materials, no added skills
- ✅ **Updated all AI models to EXCLUSIVELY use provided curriculum content**
- ✅ **Removed general knowledge synthesis** - models now only reference context
- ✅ **Added strict fallback responses** when information not in curriculum 
- ✅ **Preserved APUSH DBQ verbatim citation requirements**
- ✅ Fixed AP Biology tutor page structure to match other tutoring pages
- ✅ Added APBIO CourseType support across frontend and backend
- ✅ Added APBIO system prompt and welcome message
- ✅ Resolved all LSP diagnostics and compilation errors
- ✅ **Fixed APGOV data structure issue** - moved content from topic field to content field in first entry
- ✅ **Fixed trustee representation search** - APGOV now properly finds and explains trustee vs delegate models
- ✅ **Added backward compatibility** - API accepts both "course" and "courseType" parameters

**Previous updates:**
- Fixed critical DBQ rubric accuracy by enhancing system prompts
- Created configurable announcement banner with toggle functionality
- Enhanced history course system prompts for verbatim DBQ rubric responses
- Implemented four additional AP courses (APWH, APEURO, APES, Economics, Gov)

## User Preferences

- Navigation flow: Home → Courses → Specific Tutor
- User prefers making UI changes themselves rather than having them implemented directly
- No coding unless explicitly requested - clear boundary established
- History bots must cite DBQ rubric verbatim when asked

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/ - UI components
│   │   ├── hooks/ - Custom React hooks (use-chat.ts)
│   │   ├── lib/ - Utilities and API clients
│   │   ├── pages/ - Route components for each AP course
│   │   └── App.tsx - Main router setup
├── server/
│   ├── lib/ - Server utilities and AI integration
│   ├── routes.ts - API endpoints and course-specific prompts
│   ├── storage.ts - In-memory data storage
│   └── index.ts - Express server setup
└── shared/
    └── schema.ts - Type definitions
```

## Configuration Files

- `client/src/lib/config.ts` - Feature flags and banner controls
- `server/lib/apush-data.fixed.ts` - APUSH course content data
- `components.json` - Shadcn/ui configuration
- `tailwind.config.ts` - Custom theme definitions

## Key Features

- **Course-specific AI tutors** with tailored system prompts
- **RAG integration** for accurate, contextual responses
- **Interactive chat interface** with topic suggestions
- **Responsive design** optimized for all devices
- **Password protection** capability for course access
- **Announcement banner** system for new course launches