import './TrailerModal.css'

export default function TrailerModal({ videoId = '', title = 'Trailer', onClose }) {
  if (!videoId) return null

  return (
    <div className="trailerModal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="trailerModal__backdrop" type="button" onClick={onClose} aria-label="Close" />
      <div className="trailerModal__panel">
        <button className="trailerModal__close" type="button" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="trailerModal__frame">
          <iframe
            title={title}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

