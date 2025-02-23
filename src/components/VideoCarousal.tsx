import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const VIMEO_ACCESS_TOKEN = import.meta.env.VITE_VIMEO_ACCESS_TOKEN;
interface Video {
  title: string;
  description: string;
  image: string;
  imageRight: boolean;
  darkBg: boolean;
  dominantColor?: string;
}

export const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const truncateDescription = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSentence = truncated.match(/.*[.!?]/);
    return lastSentence
      ? lastSentence[0].trim()
      : truncated.substring(0, truncated.lastIndexOf(' ')).trim() + '...';
  };

  useEffect(() => {
    const fetchVimeoVideos = async () => {
      try {
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

        const formattedVideos = data.data.map((video: any) => ({
          title: video.name,
          description: truncateDescription(
            video.description || 'No description available',
            150,
          ),
          image:
            video.pictures?.sizes?.[video.pictures.sizes.length - 1]?.link ||
            '',
          imageRight: false,
          darkBg: true,
          dominantColor: video.dominant_color || '#3B82F6', // Use video's dominant color or default to blue
        }));

        setVideos(formattedVideos);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load videos');
        setLoading(false);
      }
    };

    fetchVimeoVideos();
  }, []);

  if (loading || error || !videos.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <div className={`text-2xl ${error ? 'text-red-500' : 'text-white'}`}>
          {loading ? 'Loading videos...' : error || 'No videos available'}
        </div>
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 blur-sm"
        style={{ backgroundImage: `url(${currentVideo.image})` }}
      >
        <div className="absolute inset-0 bg-slate-900/80" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-8 py-12 flex items-center">
        {/* Navigation - Left */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? videos.length - 1 : prev - 1,
            )
          }
          className="absolute left-4 z-10 p-4 rounded-full transition-colors"
          style={{
            backgroundColor: 'transparent',
            ['&:hover' as string]: {
              backgroundColor: currentVideo.dominantColor,
            },
          }}
          aria-label="Previous video"
        >
          <ChevronLeft className="w-8 h-8 text-white/50" />
        </button>

        <div className="flex items-center gap-16">
          {/* Movie Preview */}
          <div className="w-[400px] flex-shrink-0">
            <div
              className="relative rounded-lg overflow-hidden shadow-2xl"
              style={{ paddingBottom: '56.25%' }}
            >
              <img
                src={currentVideo.image}
                alt={currentVideo.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl font-light text-white mb-6 tracking-wide">
              {currentVideo.title}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {currentVideo.description}
            </p>
            <div className="flex gap-4">
              <button
                className="px-8 py-3 text-white rounded-md flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{ backgroundColor: currentVideo.dominantColor }}
              >
                <Play className="w-5 h-5" />
                Buy Now
              </button>
              <button className="px-8 py-3 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Right */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === videos.length - 1 ? 0 : prev + 1,
            )
          }
          className="absolute right-4 z-10 p-4 rounded-full transition-colors"
          style={{
            backgroundColor: 'transparent',
            ['&:hover' as string]: {
              backgroundColor: currentVideo.dominantColor,
            },
          }}
          aria-label="Next video"
        >
          <ChevronRight className="w-8 h-8 text-white/50" />
        </button>
      </div>
    </div>
  );
};
