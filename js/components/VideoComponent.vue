<template>
    <div class="item">
        <h1 v-if="blocked">Unable to load Google ads, check your adblock.</h1>
        <div class="player">
            <video-player  class="vjs-custom-skin"
                            ref="videoPlayer"
                            :options="playerOptions"
                            :playsinline="true"
                            @ready="loadAd">
            </video-player>
        </div>
    </div>
</template>

<script>
// Import stylesheets
import 'video.js/dist/video-js.css'
import 'videojs-contrib-ads/dist/videojs-contrib-ads.css'
import 'videojs-ima/dist/videojs.ima.css'
// Import Vue video player
import { videoPlayer } from 'vue-video-player'
// videojs
import videojs from 'video.js'
// Set the videojs instance to the window object
window.videojs = videojs
// HTTP live streaming (HLS) plugin i.e adaptive playback
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
// VideoJS contrib ads library
require('videojs-contrib-ads')
// Google Ads IMA plugin
let ima = require('videojs-ima/dist/videojs.ima');
// Register Google IMA to videojs instance on the window
// Can't call ima.init if the module is not exported by webpack (see webpack.mix.js)
if (typeof google !== 'undefined') {
  videojs.registerPlugin(ima.name, ima.init);
}

export default {
  components: {
      // Register Vue video player component
      videoPlayer
  },
  data: () => ({
    // videojs options
    blocked: typeof google === 'undefined',
    playerOptions: {
      height: '360',
      autoplay: false,
      muted: false,
      language: 'en',
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [{
        type: "application/x-mpegURL",
        // hls
        src: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
      }],
      poster: "https://raw.githubusercontent.com/vuejs/art/master/logo.png",
    }
  }),
  computed: {
    // Set the player from the template as a computed property
    // Google IMA only provides example of calling the video tag by id
    // Calling by reference mocks that behavior
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // when the player is ready
    loadAd() {
      if (!this.blocked) {
        // call Google IMA on the player instance, providing the player id and your desired VAST link
        this.player.ima({id: this._uid, adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator='});
      }
    }
  }
}
</script>
