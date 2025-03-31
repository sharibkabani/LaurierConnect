"use client"

import { useState, useRef } from "react"
import { FaPlay, FaPause, FaExpand } from "react-icons/fa"

const VideoReel = ({ videoUrl, thumbnail, title }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(currentProgress)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen()
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen()
      }
    }
  }

  return (
    <div className="video-reel">
      <div className="video-container">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="video-overlay">
          <h3 className="video-title">{title}</h3>
          <div className="video-controls">
            <button className="control-btn play-pause" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <button className="control-btn fullscreen" onClick={handleFullscreen}>
              <FaExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoReel

