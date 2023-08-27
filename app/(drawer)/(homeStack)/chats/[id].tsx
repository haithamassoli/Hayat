import { getUserByIdQuery } from "@apis/auth";
import { addMessageMutation } from "@apis/messages";
import Header from "@components/header";
import Loading from "@components/loading";
import Snackbar from "@components/snackbar";
import { Feather } from "@expo/vector-icons";
import { db } from "@src/firebase.config";
import { ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";

type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
  };
};

const ChatScreen = () => {
  const { id }: { id?: string } = useLocalSearchParams();
  const { colors } = useTheme();
  const { user } = useStore();
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: doctorData, isLoading: isLoadingUser } = getUserByIdQuery(id!);
  const { mutate } = addMessageMutation();

  useEffect(() => {
    try {
      const collectionRef = collection(db, "messages");
      const q = query(
        collectionRef,
        where("room", "==", `doctor=${id}&user=${user?.uid}`),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const oldMessages = querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: {
            _id: user?.uid!,
          },
        }));
        setMessages([
          ...oldMessages,
          {
            _id: 1,
            text: "مرحبا بك كيف يمكنني مساعدتك؟",
            createdAt: new Date("2023-9-22T14:48:00"),
            user: {
              _id: id!,
            },
          },
        ]);
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onSend = useCallback((messages = []) => {
    if (!user)
      return useStore.setState({
        snackbarText: "يجب عليك تسجيل الدخول أولاً",
      });
    const { _id, text } = messages[0];
    mutate({
      _id: _id,
      text,
      createdAt: new Date(),
      user: user?.uid!,
      room: `doctor=${id}&user=${user?.uid}`,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  if (isLoadingUser) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View entering={FadeInUp.duration(600)}>
        <Header title={doctorData?.name} />
      </Animated.View>
      <Snackbar />
      <Animated.View
        style={{ flex: 1 }}
        entering={FadeInUp.duration(600).delay(200)}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          renderAvatar={() => null}
          alwaysShowSend
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: colors.onTertiaryContainer,
                    fontSize: ms(12),
                  },
                  left: {
                    color: colors.onSecondaryContainer,
                    fontSize: ms(12),
                  },
                }}
                wrapperStyle={{
                  right: {
                    backgroundColor: colors.tertiaryContainer,
                    minHeight: vs(40),
                  },
                  left: {
                    backgroundColor: colors.secondaryContainer,
                    minHeight: vs(40),
                  },
                }}
              />
            );
          }}
          timeTextStyle={{
            right: { color: colors.onTertiaryContainer },
            left: { color: colors.onSecondaryContainer },
          }}
          renderInputToolbar={(props) => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  backgroundColor: colors.surface,
                  borderTopColor: colors.tertiaryContainer,
                  borderTopWidth: 1,
                  paddingBottom: vs(8),
                }}
              />
            );
          }}
          renderSend={(props) => {
            return (
              <Send
                textStyle={{
                  color: colors.primary,
                  fontFamily: "CairoBold",
                }}
                {...props}
              >
                <Feather
                  name="send"
                  size={vs(24)}
                  color={colors.primary}
                  style={{ marginHorizontal: vs(8) }}
                />
              </Send>
            );
          }}
          messagesContainerStyle={{
            paddingBottom: vs(8),
          }}
          textInputProps={{
            placeholder: "اكتب رسالة",
            textAlign: "right",
          }}
          user={{
            _id: user?.uid!,
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default ChatScreen;
