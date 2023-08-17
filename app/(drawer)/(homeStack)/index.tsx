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
import { hs, ms, vs } from "@utils/platform";
import { useNavigation, useRouter } from "expo-router";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const { colors } = useTheme<Theme>();
  const router = useRouter();
  const { isLoading, data: categories } = fetchCategoriesQuery();

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <ScrollView style={{ flex: 1 }}>
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
              style={{ width: hs(69), resizeMode: "contain" }}
            />
          </Box>
          <Box flexDirection="row" alignItems="center" gap="hm">
            <Feather
              name="menu"
              size={hs(24)}
              color={colors.text}
              onPress={() => navigation.openDrawer()}
            />
          </Box>
        </Box>
        <Box marginTop="vm">
          <ImagesCarousel
            images={[
              require("@assets/images/carousel/1.jpg"),
              require("@assets/images/carousel/2.jpg"),
            ]}
          />
        </Box>
        <ReText
          variant="HeadlineMedium"
          fontFamily="CairoBold"
          marginStart="hm"
          textAlign="left"
          color="ternary"
        >
          المواضيع الأساسية
        </ReText>
        <ScrollView
          horizontal
          overScrollMode="never"
          contentContainerStyle={{
            paddingLeft: hs(16),
            marginVertical: vs(12),
          }}
        >
          {categories?.map((category) => (
            <Box key={category.id} marginHorizontal="hs">
              <CategoryCard
                onPress={() => router.push(`/categories/${category.route}`)}
                title={category.title}
              />
            </Box>
          ))}
        </ScrollView>
        <ReText
          variant="HeadlineMedium"
          fontFamily="CairoBold"
          marginStart="hm"
          textAlign="left"
          color="ternary"
        >
          المرشدون
        </ReText>
        <ScrollView
          horizontal
          overScrollMode="never"
          contentContainerStyle={{
            paddingLeft: hs(16),
            marginVertical: vs(12),
          }}
        >
          {doctors.map((doctor) => (
            <Box key={doctor.id} marginHorizontal="hs">
              <DoctorCard
                onPress={() => {}}
                name={doctor.name}
                specialty={doctor.specialty}
              />
            </Box>
          ))}
        </ScrollView>
        <ReText
          variant="HeadlineMedium"
          fontFamily="CairoBold"
          marginStart="hm"
          textAlign="left"
          color="ternary"
        >
          الجهات المشرفة
        </ReText>
        <ScrollView
          horizontal
          overScrollMode="never"
          contentContainerStyle={{
            paddingLeft: hs(16),
            marginVertical: vs(12),
          }}
        >
          {official.map((official) => (
            <Image
              key={official.id}
              source={official.image}
              resizeMode="contain"
              style={{
                width: ms(100),
                height: vs(100),
                marginHorizontal: hs(8),
              }}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
