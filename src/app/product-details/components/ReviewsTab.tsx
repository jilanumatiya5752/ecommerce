'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import type { Review } from '@/lib/mockData';

interface ReviewsTabProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  ratingBreakdown: { stars: number; pct: number }[];
}

export default function ReviewsTab({ reviews, rating, reviewCount, ratingBreakdown }: ReviewsTabProps) {
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const toggleHelpful = (id: string) => {
    setHelpfulVotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="glass-card border border-border rounded-2xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Score */}
          <div className="flex flex-col items-center justify-center text-center py-4">
            <div className="text-6xl font-bold text-foreground mb-2">{rating}</div>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill={star <= Math.round(rating) ? '#F59E0B' : 'none'} stroke={star <= Math.round(rating) ? '#F59E0B' : '#374151'} strokeWidth={2}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{reviewCount.toLocaleString()} reviews</p>
          </div>

          {/* Breakdown Bars */}
          <div className="space-y-2.5">
            {ratingBreakdown.map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 shrink-0">{stars}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" className="shrink-0">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right shrink-0">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="glass-card border border-border rounded-2xl p-5 md:p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
                <AppImage
                  src={review.avatar}
                  alt={`${review.user} profile photo`}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{review.user}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-semibold text-green-400">
                      <Icon name="CheckBadgeIcon" size={10} />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="11" height="11" viewBox="0 0 24 24" fill={star <= review.rating ? '#F59E0B' : 'none'} stroke={star <= review.rating ? '#F59E0B' : '#374151'} strokeWidth={2}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-foreground mb-1.5">{review.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>

            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Helpful?</span>
              <button
                onClick={() => toggleHelpful(review.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                  helpfulVotes[review.id]
                    ? 'bg-primary/10 border-primary/30 text-primary' :'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                <Icon name="HandThumbUpIcon" size={12} />
                {review.helpful + (helpfulVotes[review.id] ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}