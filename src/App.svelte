<script>
	import { onMount } from 'svelte'
	
  import { fetchPraatbakText, savePraatbakText, changeFavicon, metaMarquee, openFullscreen, openCenterFullscreen, closeFullscreen } from './utils'

  import AsciiPlayer from './AsciiPlayer.svelte'
  
  const videos = [
    {
      title: 'GRAAFBAK',
      ytId: '3kbe6ww50UY',
      video: {
        src: '/media/GRAAFBAK.webm',
        type: 'video/webm'
      }
    },
    {
      title: 'BUNKER #001',
      ytId: 'eMKqoYe8meY'
    },
    {
      title: 'CONCRETE CAVE',
      ytId: 'wRby4-MxPNk'
    },
    {
      title: 'WASHOK',
      ytId: 'U3JTO3Ve-Ag'
    },
    {
      title: 'ROOKHOK',
      ytId: 'ggX-OPwie4A',
      video: {
        src: '/media/ROOKHOK.webm',
        type: 'video/webm'
      }
    },
  ]

  let praatbakTxt = ''
  let videoElement
  let videoCurrentTime = ''
  let videoProgress = 0
  let videoIsPlaying = true
  let videoIsMuted = false
  let pageIsFullscreen = false
  let centerIsFullscreen = false
  let headerAnimationIsRunning = false
  let activeVideoIndex = 0

  $: scrubberStyle = `transform-origin: left; transform: scaleX(${videoProgress.toFixed(3)});`
  $: videoTimeFormated = (new Date(1000 * videoCurrentTime)).toISOString().substr(11, 8)
  $: headerAnimationPlayStateStyle = `animation-play-state: ${headerAnimationIsRunning ? 'running' : 'paused'};`
  $: buttonPlayLabel = videoIsPlaying ? 'PAUSE' : 'PLAY'
  $: buttonMuteLabel = videoIsMuted ? 'UNMUTE' : 'MUTE'
  $: buttonGaanLabel = pageIsFullscreen ? 'WEG' : 'GAAN'
  $: activeVideo = videos[activeVideoIndex]
  $: youtubeIframeUrl = `https://www.youtube.com/embed/${activeVideo.ytId}?modestbranding=1&fs=0&disablekb=1&controls=1`
  $: autoplayYoutubeIframeUrl = youtubeIframeUrl + '&autoplay=1'

  // WATCHERS
  $: videoIsMuted       , videoElement && (videoElement.muted = videoIsMuted)
  $: videoIsPlaying     , videoElement && (videoIsPlaying ? videoElement.play() : videoElement.pause())
  $: pageIsFullscreen   , (document.fullscreen !== pageIsFullscreen) && (pageIsFullscreen ? openFullscreen() : closeFullscreen())
  $: centerIsFullscreen  , (document.fullscreen !== centerIsFullscreen) && (centerIsFullscreen ? openCenterFullscreen() : closeFullscreen())

  onMount(() => {
		fetchPraatbakText()
			.then(txt => (praatbakTxt = txt))

    window.setInterval(metaMarquee, 938)
  })
  
  const handleVideoProgress = (ev) => {
    videoCurrentTime = ev.srcElement.currentTime
    videoProgress = (ev.srcElement.currentTime / ev.srcElement.duration)
  }

	const handlePraatbakKeyup = (ev) => {
    if (ev.key === 'Enter') return savePraatbakText(praatbakTxt)
      .then(txt => (praatbakTxt = txt))
  }

  const toggleHeaderAnimation = () => { headerAnimationIsRunning = !headerAnimationIsRunning }

  const play = () => { videoIsPlaying = !videoIsPlaying }
  const mute = () => { videoIsMuted = !videoIsMuted }
	const scrub = (ev) => {
    const fraction = ev.layerX / ev.srcElement.scrollWidth
    videoProgress = fraction // adjust visually alreadyso no waiting for buffer
    videoElement.currentTime = fraction * videoElement.duration
  }
  const fullscreen = () => { pageIsFullscreen = !pageIsFullscreen }
  const centerFullscreen = () => { centerIsFullscreen = !centerIsFullscreen }

  const setActiveVideoByIndex = (i) => { activeVideoIndex = i }
</script>

<div id="app">
  <div class="header">
    {@html `
    <textarea>

    ██╗  ██╗███████╗██████╗ ██████╗ ███████╗███████╗    ██╗  ██╗ █████╗ ██╗   ██╗███████╗    ██╗  ██╗███████╗██████╗ ██████╗ ███████╗███████╗    ██╗  ██╗ █████╗ ██╗   ██╗███████╗    
    ██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝    ██║  ██║██╔══██╗██║   ██║██╔════╝    ██║  ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝    ██║  ██║██╔══██╗██║   ██║██╔════╝    
    ███████║█████╗  ██████╔╝██████╔╝█████╗  ███████╗    ███████║███████║██║   ██║███████╗    ███████║█████╗  ██████╔╝██████╔╝█████╗  ███████╗    ███████║███████║██║   ██║███████╗    
    ██╔══██║██╔══╝  ██╔══██╗██╔══██╗██╔══╝  ╚════██║    ██╔══██║██╔══██║██║   ██║╚════██║    ██╔══██║██╔══╝  ██╔══██╗██╔══██╗██╔══╝  ╚════██║    ██╔══██║██╔══██║██║   ██║╚════██║    
    ██║  ██║███████╗██║  ██║██║  ██║███████╗███████║    ██║  ██║██║  ██║╚██████╔╝███████║    ██║  ██║███████╗██║  ██║██║  ██║███████╗███████║    ██║  ██║██║  ██║╚██████╔╝███████║    
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    
    
    </textarea>
    `}
		<!-- <div class="marquee" on:click={toggleHeaderAnimation} style={headerAnimationPlayStateStyle}>
			<h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1>
			<h1 style="color: var(--accent-color);">HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN</h1>
			<h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1>
			<h1 style="color: var(--accent-color);">HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN HARD GAAN</h1>
			<h1>ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES ALWAYS HERRES</h1>
		</div> -->
  </div>
  <div class="main">
    <h2 class="window-header" >PRAATBAK</h2>
    <textarea bind:value={praatbakTxt} on:keyup="{handlePraatbakKeyup}" style="width: 100%; height: 100%; color: inherit; background-color: inherit; padding: 12px; outline: none; text-transform: uppercase;" ></textarea>
  </div>
  <div class="center" id="center">
    {#if activeVideo.ascii}
      <AsciiPlayer bind:videoPlayer={videoElement} on:timeupdate={handleVideoProgress} {...activeVideo.video} noBar={!centerIsFullscreen}/>
    {:else if activeVideo.video}
      <video bind:this={videoElement} on:timeupdate={handleVideoProgress} on:click={play} preload="metadata" autoplay>
        <source {...activeVideo.video}>
        <!-- Fallback for browsers that do not support HTML5 video -->
        <iframe title="fallback-player" type="text/html" src="{youtubeIframeUrl}" frameborder="0"></iframe>
      </video>
    {:else}
      <iframe title="player" id="ytplayer" type="text/html"
        src="{autoplayYoutubeIframeUrl}"
        frameborder="0">
      </iframe>
    {/if}
  </div>
  <div class="videos">
    <h2 class="window-header" >VIDEOS</h2>
    <ul>
      {#each videos as video, index}
        <li on:click="{() => setActiveVideoByIndex(index)}">{video.title}</li>
      {/each}
    </ul>
  </div>
  <div class="player">
    <video ref="video-player" muted autoplay loop src="/video/ROOKHOK-PREVIEW.MP4"></video>
  </div>
  <div class="button">
    <div class="play-status" on:click={scrub} >
      <div class="play-status__content">{activeVideo.title} - {videoTimeFormated}</div>
      <div class="play-status__content play-status__content--invert" style={scrubberStyle}></div>
    </div>
    <button on:click={play} >{buttonPlayLabel}</button>
    <button on:click={mute} >{buttonMuteLabel}</button>
    <button on:click={fullscreen} >{buttonGaanLabel}</button>
  </div>
  <div class="links">
    <a href="https://lookbook.herres.haus" class="link">Lookbook</a>
  </div>
</div>

<style lang="scss">
#app {
  height: 100%;
  min-width: 1200px;
  max-height: 100%;
  border: 1px solid var(--border-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: repeat(9, minmax(80px, 1fr));
  grid-template-columns: repeat(10, minmax(120px, 1fr));
  grid-template-areas:
    "header header header header header header header header main   main "
    "header header header header header header header header main   main "
    "videos videos videos center center center center center main   main "
    "videos videos videos center center center center center main   main "
    "videos videos videos center center center center center main   main "
    "videos videos videos center center center center center main   main "
    "player player player center center center center center main   main "
    "player player player button button button links  links  links  links"
    "player player player button button button links  links  links  links";

  & > * {
    overflow: hidden;
    border: 1px solid var(--border-color);
  }

  @media (max-width: 600px) {
    min-width: unset;
    height: auto;
    grid-template-rows: repeat(10, minmax(80px, 1fr)); // repeat(13, 80px);
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      "header header header header header"
      "header header header header header"
      "center center center center center"
      "center center center center center"
      "center center center center center"
      "videos videos button button button"
      "videos videos button button button"
      "videos videos button button button"
      "main   main   main   main   main  "
      "main   main   main   main   main  "
      "links  links  links  links  links "
      "links  links  links  links  links ";
  }
}

.header {
  grid-area: header;

  // background-image: url("https://media.giphy.com/media/3o6fITYA9xn4MCWEGA/source.gif");
  // background-position: center;
  // filter: grayscale(1) brightness(.5) contrast(1.6);
	.marquee {
		min-width: 200%;
    min-height: 200%;
		padding: 0;
		margin: 0;

		transition: transform 3s linear;
    transform: translate(-50%, -10%);

		animation: weird-marquee 30s linear infinite;

		h1 {
			z-index: 1;
			font-size: 4rem;
			line-height: 1em;
			padding: 0;
			margin: 0;
			text-align: left;
			white-space: nowrap;
		}
	}

  :global(textarea) {
    height: 100%;
    width: 100%;
    background-color: black;
    color: white;
    outline: none;
    white-space: pre;
    font-family: monospace;
    font-weight: 900;
    line-height: 1.5;
  }

  @keyframes weird-marquee {
    0% {
			transform: translate(-5%, -5%);
    }

		20% {
      transform: translate(-10%, -20%);
    }

    50% {
      transform: translate(-50%, -50%);
    }

		80% {
      transform: translate(-20%, -25%);
    }

    100% {
			transform: translate(-5%, -5%);
    }
  }
}

.main {
  grid-area: main;
  // background-image: url("https://media.giphy.com/media/3oEdv67AXWYsTqrnbi/giphy.gif");
  // background-position: center;
}

.center {
  grid-area: center;

  // REMOVE
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

	iframe, video {
		min-width: 782px;
		min-height: 100%;
		// filter: brightness(1.1) grayscale(2) contrast(2.5) hue-rotate(-17deg);
	}
}

.videos {
  grid-area: videos;
  display: flex;
  flex-direction: column;

	ul {
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
    width: 100%;
    overflow-y: scroll;
  }

  li {
    padding: 2rem;
    text-align: center;
    width: 100%;
    border-bottom: 2px solid var(--border-color);

    &:hover {
      background-color: var(--txt-color);
      color: var(--bg-color);
    }
  }
}

.player {
  grid-area: player;

  // QUICK FIX
  @media (max-width: 600px) {
    display: none;
  }

  video {
    object-fit: cover;
    height: 100%;
    width: 100%;
    filter: grayscale(1) brightness(1.1) contrast(2.5) hue-rotate(-17deg);
  }
}

.button {
  grid-area: button;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);

  border: none !important;

  button {
    color: inherit;
    background-color: inherit;
    margin: 0;
    border: 1px solid var(--border-color);
    font-weight: inherit;

    &:hover {
      color: var(--bg-color);
      background-color: var(--txt-color);
    }
  }
}

.links {
  grid-area: links;
  position: relative;

  display: flex;
  align-items: end;

  font-size: 1.3rem;

  background-position: 10%;
  border-color: black !important; // to invert invert
  filter: grayscale(1) brightness(0.9) contrast(10) invert(1);

  & > * {
    filter: invert(1);
  }

  &:hover {
    background-image: url("https://media.giphy.com/media/xTiTngxFYnbEX7RdZu/giphy.gif"); // "https://media.giphy.com/media/3oEdv67AXWYsTqrnbi/giphy.gif"
  }
}

.link {
  padding: .8em 1.4em;
  margin: 1em;

  border: 2px solid var(--border-color);
  color: white;

  text-decoration: none;
  text-transform: uppercase;
  font-weight: 900;

  &:hover {
    background-color: var(--border-color);
    color: black;
  }
}

.window-header {
  border-bottom: 2px solid var(--border-color);
  margin: 0;
  padding: .3em;
  position: relative;
  font-size: 1.2rem;
  line-height: 1em;

  &::before {
    content: "";
    position: absolute;
    top: calc(50% - 6px - 2px);
    left: 12px;
    height: 12px;
    width: 12px;
    border: 2px solid var(--border-color);

  }
}

.play-status {
  grid-column: 1 / 4;
  position: relative;
  border: 1px solid var(--border-color);

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &--invert {
      mix-blend-mode: difference;
      background-color: var(--txt-color);
    }
  }
}
</style>