import gsap from "gsap";

export const usePageTransition = () => {
  const router = useRouter();
  const pageContent = ref<HTMLElement | null>(null);

  const handleNavClick = async (link: string) => {
    if (!pageContent.value) return;

    // 创建时间轴
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.inOut",
      },
    });

    // 页面离开动画
    tl.to(pageContent.value, {
      opacity: 0,
      x: -50, // 向左移动
      filter: "blur(10px)", // 添加模糊效果
      onComplete:  () => {
        // 切换路由
         router.push(link);

        // 重置位置到右侧
        gsap.set(pageContent.value, {
          x: 50,
          opacity: 0,
          filter: "blur(10px)",
        });

        // 页面进入动画
        gsap.to(pageContent.value, {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  };

  return {
    pageContent,
    handleNavClick,
  };
};
