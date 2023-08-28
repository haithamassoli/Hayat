import { Box, ReText } from "@styles/theme";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useRef, useState } from "react";
import InfoCard from "@components/infoCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { ms, vs } from "@utils/platform";
import { Avatar, Divider, TextInput } from "react-native-paper";
import ControlledInput from "@components/ui/controlledInput";
import { useForm } from "react-hook-form";
import {
  validationCommentSchema,
  validationCommentSchemaType,
} from "@src/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@zustand/store";
import {
  dateFromNow,
  getDataFromStorage,
  storeDataToStorage,
} from "@utils/helper";
import Snackbar from "@components/snackbar";
import { ScrollView, Share, TouchableOpacity } from "react-native";
import Header from "@components/header";
import {
  addCommentMutation,
  fetchCategoriesQuery,
  Video as IVideo,
} from "@apis/categories";
import Loading from "@components/loading";
import { getUserByIdQuery } from "@apis/auth";
import Animated, { FadeInUp } from "react-native-reanimated";

const VideoScreen = () => {
  const router = useRouter();
  const { id, videoTitle }: { id?: string; videoTitle?: string } =
    useLocalSearchParams();
  const video = useRef(null);
  const { user } = useStore();
  const [status, setStatus] = useState({});
  const [like, setLike] = useState<"dislike" | "like" | null>(null);
  const { isLoading, data: categories, refetch } = fetchCategoriesQuery();

  const category = categories?.filter((category) => category.route === id);
  const data = category?.[0]?.videos?.filter(
    (video: IVideo) => video.title === videoTitle
  )[0];

  const { data: doctorData, isLoading: isLoadingUser } = getUserByIdQuery(
    data?.doctor!
  );
  const { mutate, isLoading: isLoadingComment } = addCommentMutation();

  const { handleSubmit, control, reset } = useForm<validationCommentSchemaType>(
    {
      resolver: zodResolver(validationCommentSchema),
    }
  );

  const onPressLike = async () => {
    if (like === "like") {
      setLike(null);
      await storeDataToStorage(`like-${videoTitle}`, null);
    } else {
      setLike("like");
      await storeDataToStorage(`like-${videoTitle}`, "like");
    }
  };

  const onPressDislike = async () => {
    if (like === "dislike") {
      setLike(null);
      await storeDataToStorage(`like-${videoTitle}`, null);
    } else {
      setLike("dislike");
      await storeDataToStorage(`like-${videoTitle}`, "dislike");
    }
  };

  const onSubmit = (formData: validationCommentSchemaType) => {
    if (!user)
      return useStore.setState({
        snackbarText: "يجب تسجيل الدخول أولاً",
      });
    mutate(
      {
        ...formData,
        categoryId: category?.[0].id!,
        videoTitle: videoTitle!,
        createdAt: new Date(),
        name: user?.email.split("@")[0],
      },
      {
        onSuccess: () => {
          useStore.setState({
            snackbarText: "تم إضافة التعليق بنجاح",
          });
          refetch();
          reset();
        },
      }
    );
  };

  const getLike = async () => {
    const like = await getDataFromStorage(`like-${videoTitle}`);
    setLike(like);
  };

  useEffect(() => {
    getLike();
  }, []);

  if (isLoading || isLoadingUser) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: vs(16),
        }}
      >
        <Animated.View entering={FadeInUp.duration(600)}>
          <Header title={data?.title!} />
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <Video
            ref={video}
            style={{
              width: "100%",
              aspectRatio: 16 / 9,
            }}
            source={{
              uri: data?.url!,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </Animated.View>
        <Box flex={1} marginHorizontal="hm" gap="vm" marginTop="vm">
          <Animated.View entering={FadeInUp.duration(600).delay(400)}>
            <InfoCard
              name={doctorData?.name}
              specialty={doctorData?.specialty}
              onPress={() => router.push(`/chats/${data?.doctor}`)}
            />
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <Divider bold />
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal="hm"
            >
              <TouchableOpacity
                onPress={() =>
                  Share.share({
                    message: `تابع هذا الفيديو عن
${data?.title}
${doctorData?.name} للدكتور
في تطبيق حيـاة
https://play.google.com/store/apps/details?id=com.haithamassoli.hayat
`,
                  })
                }
              >
                <Feather
                  name="share-2"
                  size={ms(24)}
                  color={Colors.secondary}
                />
              </TouchableOpacity>
              <Box flexDirection="row" gap="hm">
                <TouchableOpacity onPress={onPressDislike}>
                  <MaterialCommunityIcons
                    name={
                      like === "dislike" ? "thumb-down" : "thumb-down-outline"
                    }
                    size={ms(26)}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLike}>
                  <MaterialCommunityIcons
                    name={like === "like" ? "thumb-up" : "thumb-up-outline"}
                    size={ms(26)}
                    color={Colors.secondary}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(600).delay(600)}>
            <Divider bold />
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(600).delay(800)}>
            <ReText variant="HeadlineMedium" textAlign="left">
              التعليقات
            </ReText>
          </Animated.View>
          {isLoadingComment && (
            <Box height={vs(24)} justifyContent="center" alignItems="center">
              <Loading size="small" />
            </Box>
          )}
          <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
            <ControlledInput
              name="comment"
              control={control}
              label="أضف تعليق"
              right={
                <TextInput.Icon
                  icon="send"
                  style={{
                    transform: [{ rotate: "180deg" }],
                  }}
                  onPress={handleSubmit(onSubmit)}
                />
              }
            />
          </Animated.View>
          {Array.isArray(data?.comments) && data?.comments.length! > 0 ? (
            data?.comments?.map((comment, index) => (
              <Animated.View
                key={index}
                entering={FadeInUp.duration(600).delay(index * 200 + 1200)}
                style={{
                  marginBottom: vs(16),
                }}
              >
                <Box flexDirection="row" gap="hs">
                  <Avatar.Icon
                    icon="account"
                    size={ms(52)}
                    color={Colors.primary2}
                    style={{ backgroundColor: Colors.primary }}
                  />
                  <Box width={"84%"}>
                    <Box flexDirection="row" justifyContent="space-between">
                      <ReText variant="BodyMedium" textAlign="left">
                        {comment?.name}
                      </ReText>
                      <ReText variant="BodySmall">
                        {dateFromNow(comment?.createdAt?.toDate())}
                      </ReText>
                    </Box>
                    <ReText
                      variant="BodySmall"
                      textAlign="left"
                      style={{
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      {comment?.comment}
                    </ReText>
                  </Box>
                </Box>
              </Animated.View>
            ))
          ) : (
            <Animated.View entering={FadeInUp.duration(600).delay(1200)}>
              <ReText variant="BodyMedium" textAlign="center" marginStart="hm">
                لا يوجد تعليقات
              </ReText>
            </Animated.View>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoScreen;
