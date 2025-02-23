import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

/**
 * Interface defining the structure of a video object in the carousel
 */
interface Video {
  title: string; // The title of the video
  description: string; // A truncated description of the video
  image: string; // URL of the video thumbnail
  imageRight: boolean; // Flag to determine image position (currently unused)
  darkBg: boolean; // Flag for dark background (currently unused)
  dominantColor?: string; // The dominant color extracted from the thumbnail
}

// Vimeo API access token from environment variables
const VIMEO_ACCESS_TOKEN = import.meta.env.VITE_VIMEO_ACCESS_TOKEN;

/**
 * VideoCarousel Component
 * Displays a carousel of videos from Vimeo's Staff Picks channel with dynamic styling
 * and interactive navigation.
 */
export const VideoCarousel = () => {
  // State management for the carousel
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current video index
  const [videos, setVideos] = useState<Video[]>([]); // Stores video data
  const [loading, setLoading] = useState(true); // Loading state flag
  const [error, setError] = useState<string | null>(null); // Error state management

  /**
   * Truncates a text string to a specified length while preserving complete sentences
   * @param text - The text to truncate
   * @param maxLength - Maximum length of the truncated text
   * @returns Truncated text ending with a complete sentence or word
   */
  const truncateDescription = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSentence = truncated.match(/.*[.!?]/);
    return lastSentence
      ? lastSentence[0].trim()
      : truncated.substring(0, truncated.lastIndexOf(' ')).trim() + '...';
  };

  useEffect(() => {
    /**
     * Fetches and processes videos from the Vimeo API
     */
    const fetchVimeoVideos = async () => {
      try {
        // Fetch videos from Vimeo's Staff Picks channel
        const videosResponse = await fetch(
          'https://api.vimeo.com/channels/staffpicks/videos?per_page=10',
          {
            headers: {
              Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!videosResponse.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await videosResponse.json();

        /**
         * Extracts the dominant color from an image URL
         * @param imageUrl - URL of the image to analyze
         * @returns Promise resolving to a hex color string
         */
        const getDominantColor = async (imageUrl: string): Promise<string> => {
          return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
              // Create canvas and context for image processing
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;

              ctx?.drawImage(img, 0, 0, img.width, img.height);

              try {
                // Get image data for color analysis
                const imageData = ctx?.getImageData(
                  0,
                  0,
                  canvas.width,
                  canvas.height,
                ).data;

                if (!imageData) {
                  resolve('#3B82F6'); // Default color if image data is unavailable
                  return;
                }

                // Calculate average RGB values
                let r = 0,
                  g = 0,
                  b = 0;
                // Sample every 20th pixel for performance
                for (let i = 0; i < imageData.length; i += 20) {
                  r += imageData[i];
                  g += imageData[i + 1];
                  b += imageData[i + 2];
                }

                // Calculate average color values
                const pixelCount = imageData.length / 4;
                const sampleCount = pixelCount / 5;

                r = Math.round(r / sampleCount);
                g = Math.round(g / sampleCount);
                b = Math.round(b / sampleCount);

                // Convert RGB to hex color
                const color = `#${((1 << 24) + (r << 16) + (g << 8) + b)
                  .toString(16)
                  .slice(1)}`;
                resolve(color);
              } catch (error) {
                console.error('Error extracting color:', error);
                resolve('#3B82F6'); // Fallback color on error
              }
            };
            img.onerror = () => resolve('#3B82F6'); // Fallback color on image load error
            img.src = imageUrl;
          });
        };

        // Process video data and extract dominant colors
        const formattedVideos = await Promise.all(
          data.data.map(async (video: any) => {
            const imageUrl =
              video.pictures?.sizes?.[video.pictures.sizes.length - 1]?.link ||
              '';
            const dominantColor = await getDominantColor(imageUrl);

            return {
              title: video.name,
              description: truncateDescription(
                video.description || 'No description available',
                150,
              ),
              image: imageUrl,
              imageRight: false,
              darkBg: true,
              dominantColor,
            };
          }),
        );

        setVideos(formattedVideos);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load videos');
        setLoading(false);
      }
    };

    fetchVimeoVideos();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Handle loading and error states
  if (loading || error || !videos.length) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-900">
        <div
          className={`text-xl md:text-2xl ${
            error ? 'text-red-500' : 'text-white'
          }`}
        >
          {loading ? 'Loading videos...' : error || 'No videos available'}
        </div>
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className="w-full min-h-[400px] md:h-[600px] relative overflow-hidden">
      {/* Background layer with blur effect and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 blur-sm"
        style={{ backgroundImage: `url(${currentVideo.image})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Main content container */}
      <div className="relative h-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-[1400px] w-full flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-16">
          {/* Video thumbnail container */}
          <div className="w-full md:w-[350px] lg:w-[300px] h-[250px] md:h-[350px] flex-shrink-0">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <img
                src={currentVideo.image}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Video information and action buttons */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-light text-white mb-4 md:mb-6">
              {currentVideo.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-10 opacity-80">
              {currentVideo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                className="px-6 py-3 text-white rounded-md flex items-center justify-center gap-2 transition-all hover:opacity-90 text-base md:text-lg font-medium"
                style={{
                  backgroundColor: currentVideo.dominantColor || '#3B82F6',
                }}
              >
                <div className="bg-white bg-opacity-30 rounded-full p-1">
                  <Play className="w-4 h-4" />
                </div>
                Buy Now
              </button>
              <button className="px-4 py-2 text-white rounded-md transition-colors text-base md:text-lg font-bold border border-white bg-transparent hover:bg-white/10">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? videos.length - 1 : prev - 1,
            )
          }
          className="absolute left-2 md:left-4 z-10 p-2 md:p-4 rounded-full transition-all hover:scale-110"
          style={{
            backgroundColor: 'transparent',
            ['--hover-color' as string]: currentVideo.dominantColor,
          }}
          aria-label="Previous video"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white transition-colors hover:text-[var(--hover-color)]" />
        </button>

        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === videos.length - 1 ? 0 : prev + 1,
            )
          }
          className="absolute right-2 md:right-4 z-10 p-2 md:p-4 rounded-full transition-all hover:scale-110"
          style={
            {
              backgroundColor: 'transparent',
              '--hover-color': currentVideo.dominantColor || '#3B82F6',
            } as React.CSSProperties
          }
          aria-label="Next video"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white transition-colors hover:text-[var(--hover-color)]" />
        </button>
      </div>
    </div>
  );
};
