import { useState, useRef, memo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useTheme } from "@shopify/restyle";
import Colors from "@styles/colors";
import { hs, ms, vs } from "@utils/platform";
import { Box, Theme } from "@styles/theme";
import { useStore } from "@zustand/store";
import { blurhash, height, width } from "@utils/helper";
import { Image } from "expo-image";

type Props = {
  images: any[];
};

const ImagesCarousel = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const { isDark } = useStore((state) => state);
  const { colors } = useTheme<Theme>();

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      ),
        scrollRef.current?.scrollTo({
          animated: true,
          x: (width - hs(32)) * selectedIndex,
          y: 0,
        });
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedIndex]);

  const setImageIndex = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(selectedIndex);
  };

  return (
    <View style={styles.container}>
      <Box width={width - hs(32)} borderRadius="l" aspectRatio={68 / 39}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexDirection: "row-reverse",
          }}
          horizontal
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={setImageIndex}
          pagingEnabled
        >
          {images.length === 0 && (
            <Image
              source={require("@assets/images/carousel/2.png")}
              contentFit="cover"
              placeholder={blurhash}
              transition={400}
              style={styles.image}
            />
          )}
          {Array.isArray(images) &&
            images.map((image, index) => (
              <Image
                key={index}
                source={image}
                transition={400}
                placeholder={blurhash}
                placeholderContentFit="cover"
                style={styles.image}
              />
            ))}
        </ScrollView>
      </Box>
      <View style={styles.dotsContainer}>
        {images.length === 0 && (
          <View
            style={[
              styles.dot,
              {
                borderColor: isDark ? Colors.primary : Colors.primary,
              },
            ]}
          />
        )}
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                borderColor:
                  index === images.length - selectedIndex - 1
                    ? colors.secondary
                    : colors.black6,
                backgroundColor:
                  index === selectedIndex ? colors.secondary : colors.black6,
                width:
                  index === images.length - selectedIndex - 1 ? ms(24) : ms(8),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(ImagesCarousel);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: width - hs(32),
    aspectRatio: 68 / 39,
  },
  image: {
    borderRadius: ms(12),
    width: width - hs(32),
    aspectRatio: 68 / 39,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: vs(8),
    zIndex: 100,
  },
  dot: {
    height: ms(8),
    borderRadius: ms(6),
    borderWidth: ms(4),
    margin: ms(4),
    backgroundColor: Colors.primary,
  },
});
