import { useState, memo } from "react";
import { useTheme } from "@shopify/restyle";
import { hs, ms } from "@utils/platform";
import { Box, Theme } from "@styles/theme";
import { blurhash, width } from "@utils/helper";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import Animated, { SlideInLeft } from "react-native-reanimated";

type Props = {
  images: string[];
};

const ImagesCarousel = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { colors } = useTheme<Theme>();

  return (
    <>
      <Carousel
        width={width}
        height={width / 2}
        autoPlay={true}
        data={images!}
        autoPlayInterval={3000}
        autoPlayReverse
        onSnapToItem={setSelectedIndex}
        renderItem={({ item }) => (
          <Image
            source={item}
            transition={400}
            style={{
              width: width - hs(32),
              height: width / 2,
              borderRadius: ms(10),
            }}
            contentFit="cover"
            placeholder={blurhash}
            placeholderContentFit="cover"
          />
        )}
      />
      <Box flexDirection="row" justifyContent="flex-end" marginTop="vs">
        {images.map((_, index) => (
          <Animated.View
            key={index}
            layout={SlideInLeft.withInitialValues({
              originX: 0,
            })}
          >
            <Box
              key={index}
              height={ms(8)}
              width={ms(8)}
              borderRadius="l"
              marginHorizontal="hxs"
              marginVertical="vxs"
              style={{
                backgroundColor:
                  index === images.length - selectedIndex - 1
                    ? colors.secondary
                    : colors.black6,
                width:
                  index === images.length - selectedIndex - 1 ? ms(24) : ms(8),
              }}
            />
          </Animated.View>
        ))}
      </Box>
    </>
  );
};

export default memo(ImagesCarousel);
