import React, { useState, useMemo } from 'react';
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles, WHITE, GOLD, MUTED, ACCENT } from './gastro.styles';

// Import menu data
import menuData from '../../assets/data/menu.json';

// Category config: icon + color for each category
const CATEGORY_CONFIG: Record<string, { color: string; icon: any }> = {
  'ALL':          { color: GOLD,       icon: 'apps-outline' },
  'Main Courses': { color: '#fb923c',  icon: 'restaurant-outline' },
  'Drinks':       { color: '#60a5fa',  icon: 'beer-outline' },
  'Desserts':     { color: '#f472b6',  icon: 'ice-cream-outline' },
};

const getCategoryConfig = (name: string) =>
  CATEGORY_CONFIG[name] || { color: WHITE, icon: 'fast-food-outline' };

type MenuItem = {
  id: string;
  name: string;
  price: number;
  restaurant: {
    name: string;
    opening_hours: string;
  };
  ingredients: string;
  image: string;
  categoryName?: string;
};

// Persist selected category across navigation (module-level variable)
let persistedCategory = 'ALL';

export default function GastroScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>(persistedCategory);

  const handleCategoryChange = (category: string) => {
    persistedCategory = category;
    setSelectedCategory(category);
  };

  // Flatten all items from all categories
  const allCategories = menuData.festival_menu.categories;

  const allItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [];
    allCategories.forEach(cat => {
      cat.items.forEach(item => {
        items.push({ ...item, categoryName: cat.name });
      });
    });
    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL') return allItems;
    const cat = allCategories.find(c => c.name === selectedCategory);
    if (!cat) return [];
    return cat.items.map(item => ({ ...item, categoryName: cat.name }));
  }, [selectedCategory, allItems, allCategories]);

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO BANNER */}
        <View style={[styles.heroContainer, { paddingTop: insets.top }]}>
          <Image
            source={require('../../assets/images/menu.jpg')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.75)', '#000000']}
            locations={[0, 0.3, 0.5, 0.75, 1.0]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* HEADER OVERLAY */}
          <View style={[styles.overlayHeader, { top: insets.top }]}>
            <TouchableOpacity style={styles.headerSide} onPress={() => router.push('/contact')}>
              <Ionicons name="information-circle-outline" size={36} color={WHITE} />
            </TouchableOpacity>
            <View style={styles.headerCenter} pointerEvents="none">
              <RNImage
                source={require('../../assets/images/tmwl_logo.png')}
                style={styles.centerLogo}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={[styles.headerSide, styles.headerSideRight]}
              onPress={() => router.push('/login')}
            >
              <Ionicons name="person-circle-outline" size={36} color={WHITE} />
            </TouchableOpacity>
          </View>

          {/* HERO CONTENT */}
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Food &amp; Drinks</Text>
            <Text style={styles.heroTitle}>Festival{'\n'}Flavours</Text>
          </View>
        </View>

        {/* CATEGORY SELECTOR (Horizontal) */}
        <View style={{ backgroundColor: '#000' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categorySelector}
          >
            {/* ALL button */}
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === 'ALL' && styles.categoryButtonActive,
              ]}
              onPress={() => handleCategoryChange('ALL')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons
                  name="apps-outline"
                  size={16}
                  color={selectedCategory === 'ALL' ? GOLD : MUTED}
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === 'ALL' && styles.categoryButtonTextActive,
                  ]}
                >
                  ALL
                </Text>
              </View>
            </TouchableOpacity>

            {/* Category buttons */}
            {allCategories.map(cat => {
              const config = getCategoryConfig(cat.name);
              const isActive = selectedCategory === cat.name;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    isActive && {
                      borderColor: config.color,
                      backgroundColor: `${config.color}20`,
                    },
                  ]}
                  onPress={() => handleCategoryChange(cat.name)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Ionicons
                      name={config.icon}
                      size={16}
                      color={isActive ? config.color : MUTED}
                    />
                    <Text
                      style={[
                        styles.categoryButtonText,
                        isActive && { color: config.color, fontWeight: '700' },
                      ]}
                    >
                      {cat.name.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* MENU ITEM LIST */}
        <View style={styles.body}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const catConfig = getCategoryConfig(item.categoryName ?? '');
              return (
                <View key={`${item.id}-${index}`} style={styles.itemCard}>
                  {/* Food image */}
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    contentFit="cover"
                  />

                  {/* Info section */}
                  <View style={styles.itemInfo}>
                    {/* Name */}
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>

                    {/* Price */}
                    <Text style={styles.priceTag}>€{item.price.toFixed(2)}</Text>

                    {/* Restaurant */}
                    <View style={styles.restaurantRow}>
                      <Ionicons name="storefront-outline" size={12} color={catConfig.color} />
                      <Text style={styles.restaurantText} numberOfLines={1}>
                        {item.restaurant.name}
                      </Text>
                    </View>

                    {/* Opening hours */}
                    <View style={styles.hoursRow}>
                      <Ionicons name="time-outline" size={12} color={GOLD} />
                      <Text style={styles.hoursText}>{item.restaurant.opening_hours}</Text>
                    </View>
                  </View>

                  {/* Location icon on the right */}
                  <TouchableOpacity style={{ padding: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="location-outline" size={24} color={WHITE} />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items found for this category.</Text>
            </View>
          )}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <AppBottomNav />
    </SafeAreaView>
  );
}
