import { Video, fetchCategoriesQuery } from "@apis/categories";
import Loading from "@components/loading";
import VideoButton from "@components/ui/videoButton";
import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Category = () => {
  const router = useRouter();
  const { id }: { id?: string } = useSearchParams();
  const { isLoading, data: categories } = fetchCategoriesQuery();

  categories?.filter((category) => category.route === id);

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: hs(16) }}>
      <Stack.Screen
        options={{
          title: id,
        }}
      />
      <Box
        flexDirection="row"
        position="absolute"
        right={0}
        top={vs(64)}
        zIndex="modal"
      >
        <Feather
          name="chevron-left"
          size={ms(24)}
          color={Colors.secondary}
          onPress={() => router.back()}
          style={{
            marginRight: hs(-16),
          }}
        />
        <Feather
          name="chevron-left"
          size={ms(24)}
          color={Colors.secondary}
          onPress={() => router.back()}
        />
      </Box>
      <Image
        source={require("@assets/images/family.png")}
        style={{ width: "100%", height: vs(274) }}
      />
      <ReText
        variant="HeadlineMedium"
        fontFamily="CairoBold"
        textAlign="left"
        color="ternary"
        marginTop="vs"
      >
        المحاضرات التربوية
      </ReText>
      <Box gap="vm">
        {Array.isArray(categories) &&
          categories[0].videos?.map((video: Video, index: number) => (
            <VideoButton
              key={index.toString()}
              title={`1. ${video.title}`}
              onPress={() => router.push(`/videos/${video.title}`)}
              duration={video.duration}
            />
          ))}
      </Box>
    </SafeAreaView>
  );
};

export default Category;
