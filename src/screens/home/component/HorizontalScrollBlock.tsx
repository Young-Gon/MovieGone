import React from "react";
import { FlatList, FlatListProps, View } from "react-native";

export default function HorizontalScrollBlock<ItemT>(props: FlatListProps<ItemT>) {
  return <FlatList
            {...props}
            horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
  />;
}