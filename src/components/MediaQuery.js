const defaultBreakpoints = {
  mobile: "(min-width: 0px)", // used think in first mobile
  tablet: "(min-width: 640px)", // => @media (min-width: 640px) { ... }
  laptop: "(min-width: 1024px)", // => @media (min-width: 1024px) { ... }
  desktop: "(min-width: 1280px)" // => @media (min-width: 1280px) { ... }
};

export default {
  name: "Breakpoint",
  model: {
    prop: "value",
    event: "mediaChange"
  },
  props: {
    mediaQuery: {
      type: [String, Array],
      required: true
    },
    value: {
      type: Object,
      default: {
        mediaQuery: {
          rule: "",
          isValid: false
        }
      }
    },
    breakpoints: {
      type: Object,
      default: () => defaultBreakpoints
    }
  },
  data() {
    return {
      isMatched: {
        mediaQuery: {
          rule: "",
          isValid: false
        }
      }
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMatched = this.evaluateMediaQuery();
      console.log(this.isMatched);
      this.$emit("mediaChange", this.isMatched);
    },
    evaluateMediaQuery() {
      if (Array.isArray(this.mediaQuery)) {
        return this.processArrayMediaQuery();
      } else if (typeof this.mediaQuery === "string") {
        return this.processStringMediaQuery();
      }
    },
    processArrayMediaQuery() {
      const filteredValidMediaQueries = this.mediaQuery.filter(item =>
        this.breakpoints.hasOwnProperty(item)
      );
      let objectResponse = {};
      filteredValidMediaQueries.forEach(mediaQueryName => {
        const breakpointRule = this.breakpoints[mediaQueryName];
        objectResponse[mediaQueryName] = this.evaluateRule(breakpointRule);
      });
      return objectResponse;
    },
    processStringMediaQuery() {
      return {
        mediaQuery: this.evaluateRule(this.mediaQuery)
      };
    },
    evaluateRule(mediaQuery) {
      return {
        rule: mediaQuery,
        isValid: window.matchMedia(mediaQuery).matches,
        currentWidth: window.innerWidth,
        curentHeight: window.innerHeight,
        orientation: window.screen.orientation.type
      };
    }
  },
  render(createElement) {
    return createElement("div", this.$slots.default);
  }
};
