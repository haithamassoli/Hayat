import { Video, fetchCategoriesQuery } from "@apis/categories";
import Loading from "@components/loading";
import VideoButton from "@components/ui/videoButton";
import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { blurhash } from "@utils/helper";
import { hs, ms, vs } from "@utils/platform";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";

const Category = () => {
  const { id }: { id?: string } = useLocalSearchParams();
  const { isLoading, data: categories } = fetchCategoriesQuery();

  categories?.filter((category) => category.route === id);

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: id,
        }}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          flexDirection: "row",
          position: "absolute",
          right: hs(14),
          top: vs(72),
          zIndex: 3,
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
      </TouchableOpacity>
      <Image
        source={require("@assets/images/family.png")}
        style={{ width: "100%", height: vs(274) }}
        contentFit="cover"
        placeholder={blurhash}
        placeholderContentFit="cover"
        transition={400}
      />
      <Box marginHorizontal="hm">
        <Animated.View entering={FadeInUp.duration(600)}>
          <ReText
            variant="HeadlineMedium"
            fontFamily="CairoBold"
            textAlign="left"
            color="ternary"
            marginTop="vs"
          >
            المحاضرات التربوية
          </ReText>
        </Animated.View>
        <Box gap="vm">
          {Array.isArray(categories) &&
            categories[0].videos?.map((video: Video, index: number) => (
              <Animated.View
                key={index.toString()}
                entering={FadeInUp.duration(600).delay(200 * index)}
              >
                <VideoButton
                  title={`1. ${video.title}`}
                  onPress={() =>
                    router.push(`/videos/${id}?videoTitle=${video.title}`)
                  }
                  duration={video.duration}
                />
              </Animated.View>
            ))}
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Category;
