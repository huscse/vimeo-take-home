# Vimeo Viewer Home Assessment

## Overview

This project is a submission for the Vimeo Software Engineer Intern position (Viewer Home team). It implements a video showcase platform that demonstrates integration with the Vimeo API, responsive design principles, and modern frontend development practices.

## Key Implementation Highlights

### 1. Dynamic Video Carousel

- Integrated with Vimeo's Staff Picks channel using the Vimeo API
- Implemented automatic color extraction from video thumbnails for dynamic theming
- Built smooth transitions between videos with keyboard accessibility
- Handled loading and error states gracefully

### 2. Project Showcase Section

- Created a responsive layout system that adapts to different screen sizes
- Implemented flexible image positioning (left/right) based on content requirements
- Used CSS Grid and Flexbox for modern layout management
- Added subtle animations and transitions for enhanced user experience

### 3. Technical Decisions

**TypeScript Implementation**

- Used TypeScript for type safety and better code maintainability
- Implemented interfaces for Video and Project data structures
- Added proper type checking for API responses

**Performance Optimizations**

- Implemented efficient color extraction algorithm sampling every 20th pixel
- Used proper image sizing and lazy loading techniques
- Minimized re-renders using React's useMemo and useCallback hooks
- Implemented debouncing for window resize events

**Responsive Design**

- Mobile-first approach with progressive enhancement
- Breakpoints aligned with common device sizes
- Flexible grid system for content layout
- Responsive typography and spacing

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- Vimeo API access token

### Setup Instructions

1. Clone and install dependencies:

```bash
git clone [https://github.com/huscse/vimeo-take-home]
cd vimeo-assessment
npm install
```

2. Create `.env` file in the root directory:

```env
VITE_VIMEO_ACCESS_TOKEN=your_vimeo_api_token_here
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── VideoCarousel.tsx    # Main video carousel component
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## Implementation Notes

### Video Carousel Component

The `VideoCarousel` component demonstrates:

- Integration with Vimeo's API
- Dynamic color extraction from thumbnails
- Responsive design principles
- Proper error handling
- Loading state management
- Accessibility considerations

### Project Section Component

The `App.tsx` serves as the layout that showcases:

- Flexible layout system
- Conditional rendering
- Responsive image handling
- Dynamic styling based on content

## Testing

To run the test suite:

```bash
npm run test
```

## Areas for Future Enhancement

Given more time, I would implement:

1. **Video Features**

   - Direct video playback integration
   - Advanced video controls
   - Video analytics tracking

2. **Performance**

   - Implement video thumbnail caching
   - Add virtual scrolling for large lists
   - Optimize image loading strategy

3. **User Experience**

   - Add more interactive features
   - Implement skeleton loading states
   - Enhance keyboard navigation

4. **Testing**
   - Add more unit tests
   - Implement integration tests
   - Add performance benchmarks

## Design Decisions and Trade-offs

1. **Color Extraction**

   - Used canvas-based color extraction for performance
   - Implemented sampling to balance accuracy and speed
   - Added fallback colors for error cases

2. **API Integration**

   - Used fetch API for simplicity
   - Implemented proper error handling
   - Added retry logic for failed requests

3. **State Management**

   - Used React's built-in state management
   - Implemented proper loading and error states
   - Maintained clean component architecture

4. **Styling Approach**
   - Used Tailwind CSS for rapid development
   - Implemented custom utility classes where needed
   - Maintained consistent spacing and typography

## Code Quality Measures

- Consistent code formatting with Prettier
- ESLint for code quality
- TypeScript for type safety
- Proper component documentation
- Clean code principles
- Meaningful variable naming
- Proper error handling

## Running the Project Locally

1. Ensure all prerequisites are installed
2. Follow the setup instructions above
3. The application should work out of the box with the provided Vimeo API token

## Questions?

For any questions about my implementation or technical decisions, please feel free to reach out. I'm happy to explain my thought process or provide additional details about any aspect of the project.

---

Thank you for considering my application for the Software Engineer Intern position on the Viewer Home team. I look forward to discussing my implementation and the next steps!
