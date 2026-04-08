import { onMounted, ref } from "vue";
import fallbackBanner from "../assets/service-fallback.svg";

export function useBannerResolver() {
  const resolvedBannerMap = ref({});

  const resolveBanner = (item) => {
    const url = item?.bannerUrl;

    if (!url) {
      resolvedBannerMap.value[item.id] = fallbackBanner;
      return;
    }

    const image = new Image();

    image.onload = () => {
      resolvedBannerMap.value[item.id] = url;
    };

    image.onerror = () => {
      resolvedBannerMap.value[item.id] = fallbackBanner;
    };

    image.src = url;
  };

  const preloadBanners = (items = []) => {
    items.forEach(resolveBanner);
  };

  const getResolvedBanner = (item) => {
    return resolvedBannerMap.value[item.id] || fallbackBanner;
  };

  const getCardBackgroundStyle = (item) => {
    return {
      backgroundImage: `url("${getResolvedBanner(item)}")`,
    };
  };

  return {
    resolvedBannerMap,
    preloadBanners,
    getResolvedBanner,
    getCardBackgroundStyle,
  };
}
