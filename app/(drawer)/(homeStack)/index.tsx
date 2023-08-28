import { fetchCategoriesQuery } from "@apis/categories";
import CategoryCard from "@components/categoryCard";
import DoctorCard from "@components/doctorCard";
import ImagesCarousel from "@components/imagesCarousel";
import Loading from "@components/loading";
import Snackbar from "@components/snackbar";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { doctors } from "@src/data/doctors";
import { official } from "@src/data/official";
import { Box, ReText, Theme } from "@styles/theme";
import { blurhash } from "@utils/helper";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const { colors } = useTheme<Theme>();
  const router = useRouter();
  const { isDark } = useStore();
  const { isLoading, data: categories } = fetchCategoriesQuery();

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <ScrollView style={{ flex: 1 }}>
        <Animated.View entering={FadeInUp.duration(600)}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginEnd="hm"
            height={60}
          >
            <Box flexDirection="row" alignItems="center">
              <Image
                source={require("@assets/images/logo.png")}
                style={{
                  width: isDark ? ms(49) : ms(69),
                  height: isDark ? ms(49) : ms(69),
                  backgroundColor: isDark ? colors.ternary : "transparent",
                  borderRadius: isDark ? ms(34) : 0,
                }}
                contentFit="contain"
                transition={400}
              />
            </Box>
            <Box flexDirection="row" alignItems="center" gap="hm">
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={hs(24)} color={colors.text} />
              </TouchableOpacity>
            </Box>
          </Box>
        </Animated.View>
        <Box marginTop="vm">
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <ImagesCarousel
              images={[
                require("@assets/images/carousel/2.png"),
                require("@assets/images/carousel/2.png"),
              ]}
            />
          </Animated.View>
        </Box>
        <Animated.View entering={FadeInUp.duration(600).delay(400)}>
          <ReText
            variant="HeadlineMedium"
            fontFamily="CairoBold"
            marginStart="hm"
            textAlign="left"
            color="ternary"
          >
            المواضيع الأساسية
          </ReText>
        </Animated.View>
        <ScrollView
          horizontal
          overScrollMode="never"
          contentContainerStyle={{
            paddingLeft: hs(16),
            marginVertical: vs(12),
          }}
        >
          {categories?.map((category, index) => (
            <Box key={category.id} marginHorizontal="hs">
              <Animated.View
                entering={FadeInUp.duration(600).delay(index * 200 + 600)}
              >
                <CategoryCard
                  onPress={() => router.push(`/categories/${category.route}`)}
                  title={category.title}
                />
              </Animated.View>
            </Box>
          ))}
        </ScrollView>
        <Animated.View entering={FadeInUp.duration(600).delay(800)}>
          <ReText
            variant="HeadlineMedium"
            fontFamily="CairoBold"
            marginStart="hm"
            textAlign="left"
            color="ternary"
          >
            المرشدون
          </ReText>
        </Animated.View>
        <ScrollView
          horizontal
          overScrollMode="never"
          contentContainerStyle={{
            paddingLeft: hs(16),
            marginVertical: vs(12),
          }}
        >
          {doctors.map((doctor, index) => (
            <Box key={doctor.uid} marginHorizontal="hs">
              <Animated.View
                entering={FadeInUp.duration(600).delay(index * 200 + 1000)}
              >
                <DoctorCard
                  onPress={() => {
                    router.push(`/chats/${doctor.uid}`);
                  }}
                  name={doctor.name}
                  specialty={doctor.specialty}
                />
              </Animated.View>
            </Box>
          ))}
        </ScrollView>
        <Animated.View entering={FadeInUp.duration(600).delay(1200)}>
          <ReText
            variant="HeadlineMedium"
            fontFamily="CairoBold"
            marginStart="hm"
            textAlign="left"
            color="ternary"
          >
            الجهات المشرفة
          </ReText>
        </Animated.View>
        <ScrollView
          horizontal
          overScrollMode="never"
          contentContainerStyle={{
            paddingLeft: hs(16),
            marginVertical: vs(12),
          }}
        >
          {official.map((official, index) => (
            <Animated.View
              key={official.id}
              entering={FadeInUp.duration(600).delay(index * 200 + 1400)}
            >
              <Image
                source={official.image}
                contentFit="contain"
                placeholder={blurhash}
                placeholderContentFit="contain"
                transition={400}
                style={{
                  width: ms(100),
                  height: ms(100),
                  marginHorizontal: hs(8),
                }}
              />
            </Animated.View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
