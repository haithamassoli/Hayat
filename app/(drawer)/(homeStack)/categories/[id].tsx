import { Video, fetchCategoriesQuery } from "@apis/categories";
import Loading from "@components/loading";
import VideoButton from "@components/ui/videoButton";
import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { blurhash } from "@utils/helper";
import { hs, isIOS, ms, vs } from "@utils/platform";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Category = () => {
  const { id }: { id?: string } = useLocalSearchParams();
  const { isLoading, data: categories } = fetchCategoriesQuery();

  const filteredCategory = categories?.filter(
    (category) => category.route === id
  );

  if (isLoading) return <Loading />;

  return (
    <Box
      flex={1}
      style={{
        paddingTop: useSafeAreaInsets().top,
      }}
    >
      <Stack.Screen
        options={{
          title: id,
        }}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          right: hs(14),
          top: vs(72),
          zIndex: 3,
        }}
      >
        <Animated.View
          entering={FadeInUp.duration(600)}
          style={{
            flexDirection: "row",
          }}
        >
          <Feather name="chevron-left" size={ms(24)} color={Colors.secondary} />
          <Feather
            name="chevron-left"
            size={ms(24)}
            color={Colors.secondary}
            style={{
              marginLeft: hs(-12),
            }}
          />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View entering={FadeInUp.duration(600)}>
        <Image
          source={require("@assets/images/family.png")}
          style={{ width: "100%", height: vs(274) }}
          contentFit="cover"
          placeholder={blurhash}
          placeholderContentFit="cover"
          transition={400}
        />
      </Animated.View>
      <Box marginHorizontal="hm">
        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <ReText
            variant="HeadlineMedium"
            fontFamily="CairoBold"
            textAlign="left"
            color="ternary"
            marginTop="vs"
          >
            المحاضرات
          </ReText>
        </Animated.View>
        <Box gap="vm">
          {Array.isArray(filteredCategory) &&
            filteredCategory[0].videos?.map((video: Video, index: number) => (
              <Animated.View
                key={index.toString()}
                entering={FadeInUp.duration(600)
                  .delay(200 * index + 400)
                  .withInitialValues({
                    opacity: isIOS ? 0 : 1,
                    transform: [{ translateY: vs(250) }],
                  })}
              >
                <VideoButton
                  title={`${index + 1}. ${video.title}`}
                  onPress={() =>
                    router.push(`/videos/${id}?videoTitle=${video.title}`)
                  }
                  duration={video.duration}
                />
              </Animated.View>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
