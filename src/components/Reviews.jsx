import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'

export default function Reviews() {
  const { t } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(true)

  // Fetch existing reviews on mount
  useEffect(() => {
    fetchReviews()
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('reviews')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'reviews' },
        (payload) => {
          setReviews(prev => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const fetchReviews = async () => {
    setFetchLoading(true)
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setReviews(data || [])
    setFetchLoading(false)
  }

  const submitReview = async () => {
    if (!name.trim()) return setError(t('review_error_name'))
    if (!comment.trim()) return setError(t('review_error_comment'))

    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('reviews')
      .insert([{ name: name.trim(), comment: comment.trim() }])

    if (error) {
      setError(error.message)
    } else {
      setName('')
      setComment('')
    }
    setLoading(false)
  }

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString()
  }
  
  return (
    <div className="reviews-page">
      <div className="reviews-header-section">
        <h2 className="reviews-page-title">💬 {t('reviews_title')}</h2>
        <p className="reviews-page-sub">{t('reviews_sub')}</p>
      </div>

      {/* Submit form */}
      <div className="review-form">
        <div className="review-input-group">
          <label>{t('your_name')}</label>
          <input
            type="text"
            placeholder={t('your_name_placeholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="review-input-group">
          <label>{t('your_review')}</label>
          <textarea
            placeholder={t('your_review_placeholder')}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>
        {error && <div className="error-banner">⚠ {error}</div>}
        <button
          className="analyze-btn"
          onClick={submitReview}
          disabled={loading}
        >
          {loading ? (
            <span className="loading-text">
              <span className="spinner" />
              {t('submitting')}
            </span>
          ) : t('submit_review')}
        </button>
      </div>

      {/* Reviews list */}
      <div className="reviews-list">
        {fetchLoading ? (
          <div className="reviews-loading">
            <span className="spinner" style={{borderTopColor: 'var(--accent)'}} />
          </div>
        ) : reviews.length === 0 ? (
          <p className="no-reviews">{t('no_reviews')}</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="review-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="review-name">{review.name}</p>
                  <p className="review-date">{formatDate(review.created_at)}</p>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}