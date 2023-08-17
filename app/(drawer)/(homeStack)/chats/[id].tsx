import { getUserByIdQuery } from "@apis/auth";
import { addMessageMutation } from "@apis/messages";
import Header from "@components/header";
import Loading from "@components/loading";
import { Feather } from "@expo/vector-icons";
import { db } from "@src/firebase.config";
import { vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { useRouter, useSearchParams } from "expo-router";
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

type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
  };
};

const ChatScreen = () => {
  const router = useRouter();
  const { id }: { id?: string } = useSearchParams();
  const { colors } = useTheme();
  const { user } = useStore();
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: doctorData, isLoading: isLoadingUser } = getUserByIdQuery(id!);
  const { mutate } = addMessageMutation();

  useEffect(() => {
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
          createdAt: new Date(),
          user: {
            _id: id!,
          },
        },
      ]);
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
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
      <Header title={doctorData?.name} />
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
                },
                left: {
                  color: colors.onSecondaryContainer,
                },
              }}
              wrapperStyle={{
                right: {
                  backgroundColor: colors.tertiaryContainer,
                },
                left: {
                  backgroundColor: colors.secondaryContainer,
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
        textInputProps={{
          placeholder: "اكتب رسالة",
          textAlign: "right",
        }}
        user={{
          _id: user?.uid!,
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
