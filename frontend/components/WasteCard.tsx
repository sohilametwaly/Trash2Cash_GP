import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { Image } from 'expo-image';
import { useAuth } from '../store/context';

interface WasteCardProps {
  item: {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    seller: {
      _id: string;
      name: string;
    };
  };
  onPress: () => void;
}

export function WasteCard({ item, onPress }: WasteCardProps) {
  const { authUser } = useAuth();
  const isOwner = authUser?._id === item.seller._id;

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text variant="titleLarge">{item.title}</Text>
            <Text variant="labelLarge" style={styles.category}>
              {item.category}
            </Text>
          </View>
          <Text variant="titleLarge" style={styles.price}>
            ${item.price}
          </Text>
        </View>
        
        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
        
        <View style={styles.footer}>
          <Text variant="labelMedium">
            Posted by: {item.seller.name}
          </Text>
          {isOwner && (
            <IconButton
              icon="pencil"
              size={20}
              onPress={() => {/* Handle edit */}}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
  },
  content: {
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  category: {
    color: '#666',
    marginTop: 4,
  },
  price: {
    color: '#2196F3',
  },
  description: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
}); 