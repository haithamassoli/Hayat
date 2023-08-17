import { Box, ReText } from "@styles/theme";
import { useRouter, useSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { useRef, useState } from "react";
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
import { dateFromNow } from "@utils/helper";
import Snackbar from "@components/snackbar";
import { ScrollView } from "react-native";
import Header from "@components/header";
import {
  addCommentMutation,
  fetchCategoriesQuery,
  Video as IVideo,
} from "@apis/categories";
import Loading from "@components/loading";
import { getUserByIdQuery } from "@apis/auth";

const VideoScreen = () => {
  const router = useRouter();
  const { id, videoTitle }: { id?: string; videoTitle?: string } =
    useSearchParams();
  const video = useRef(null);
  const { user } = useStore();
  const [status, setStatus] = useState({});
  const { isLoading, data: categories, refetch } = fetchCategoriesQuery();

  const category = categories?.filter((category) => category.route === id);
  const data = category?.[0].videos.filter(
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
        <Header title={data?.title!} />
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
        <Box flex={1} marginHorizontal="hm" gap="vm" marginTop="vm">
          <InfoCard
            name={doctorData?.name}
            specialty={doctorData?.specialty}
            onPress={() => router.push(`/chats/${data?.doctor}`)}
          />
          <Divider bold />
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginHorizontal="hm"
          >
            <Feather name="share-2" size={ms(24)} color={Colors.secondary} />
            <Box flexDirection="row" gap="hm">
              <MaterialCommunityIcons
                name="thumb-down-outline"
                size={ms(26)}
                color={Colors.secondary}
              />
              <MaterialCommunityIcons
                name="thumb-up-outline"
                size={ms(26)}
                color={Colors.secondary}
              />
            </Box>
          </Box>
          <Divider bold />
          <ReText variant="HeadlineMedium" textAlign="left">
            التعليقات
          </ReText>
          <Box height={vs(16)} />
          {isLoadingComment && (
            <Box height={vs(24)} justifyContent="center" alignItems="center">
              <Loading size="small" />
            </Box>
          )}
          <Box>
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
          </Box>
          {Array.isArray(data?.comments) && data?.comments.length! > 0 ? (
            data?.comments?.map((comment, index) => (
              <Box key={index} marginBottom="hm">
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
                        {dateFromNow(comment?.createdAt)}
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
              </Box>
            ))
          ) : (
            <ReText variant="BodyMedium" textAlign="center" marginStart="hm">
              لا يوجد تعليقات
            </ReText>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoScreen;
