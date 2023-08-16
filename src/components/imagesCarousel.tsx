import { useState, useRef, memo } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useEffect } from "react";
import { useTheme } from "@shopify/restyle";
import Colors from "@styles/colors";
import { Shadow } from "react-native-shadow-2";
import { hs, ms, vs } from "@utils/platform";
import { Theme } from "@styles/theme";
import { useStore } from "@zustand/store";
import { height, width } from "@utils/helper";

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
      <Shadow
        distance={8}
        stretch
        startColor={colors.shadow}
        endColor="rgba(0, 0, 0, 0)"
        style={styles.shadow}
      >
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
              source={require("@assets/images/carousel/1.jpg")}
              style={styles.image}
            />
          )}
          {images.map((image, index) => (
            <TouchableOpacity
              onPress={() => {
                if (image.url) {
                  Linking.openURL(image?.url);
                }
              }}
              key={index}
              activeOpacity={image.url ? 0.5 : 1}
            >
              <Image
                source={image}
                defaultSource={require("@assets/images/carousel/1.jpg")}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Shadow>
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
    height: vs(232),
  },
  shadow: {
    borderRadius: ms(12),
    width: width - hs(32),
    height: height * 0.24,
  },
  image: {
    resizeMode: "cover",
    borderRadius: ms(12),
    width: width - hs(32),
    height: height * 0.24,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: vs(8),
    zIndex: 100,
  },
  dot: {
    height: vs(8),
    width: vs(8),
    borderRadius: ms(6),
    borderWidth: ms(4),
    margin: ms(4),
    backgroundColor: Colors.primary,
  },
});
