import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles, MUTED } from './gastro.styles';
import foodData from '@/assets/data/food&drinks.json';

// Árkategória számoló euró alapján
const getPriceLevel = (priceEur: number) => {
  if (priceEur < 8) return '$';
  if (priceEur < 15) return '$$';
  return '$$$';
};

// JSON adatok előkészítése a listához az új struktúra alapján
const getFlattenedData = () => {
  const flattened: any[] = [];
  const options = foodData.food_options;
  
  Object.keys(options).forEach((categoryKey) => {
    options[categoryKey].forEach((item: any, index: number) => {
      // Mivel a JSON kulcsai pontosan 'Food', 'Drinks' és 'Desserts',
      // a tag értéke közvetlenül a categoryKey lesz.
      flattened.push({
        id: `${categoryKey}-${index}`,
        name: item.name,
        // Ha online elővételes, akkor VIP helyszín, egyébként sima Food Court
        location: item.payment_method.includes('Online') ? 'Mainstage VIP' : 'Food Court A',
        priceEur: item.price_eur,
        priceLevel: getPriceLevel(item.price_eur),
        tag: categoryKey, // 'Food', 'Drinks' vagy 'Desserts'
      });
    });
  });
  return flattened;
};

const FLATTENED_DATA = getFlattenedData();

export default function GastroScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activePrice, setActivePrice] = useState<string | null>(null);

  // Szűrési logika
  const filteredData = FLATTENED_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? item.tag === activeCategory : true;
    const matchesPrice = activePrice ? item.priceLevel === activePrice : true;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      {/* Sötét kép placeholder kategória-specifikus emojival */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageIcon}>
          {item.tag === 'Food' ? '🍔' : item.tag === 'Drinks' ? '🍹' : '🍰'}
        </Text>
      </View>
      
      {/* Kártya információk */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.location}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{item.priceLevel}</Text>
          <Text style={[styles.cardSubtitle, { fontSize: 10, marginTop: 0 }]}>
            • {item.priceEur} EUR
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.screen}>
        <AppHeader />

        <View style={styles.content}>
          {/* Keresőmező */}
          <View style={styles.searchContainer}>
             <Text style={styles.searchIcon}>🔍</Text>
             <TextInput
               style={styles.searchInput}
               placeholder="Mit ennél, innál?"
               placeholderTextColor={MUTED}
               value={searchQuery}
               onChangeText={setSearchQuery}
             />
          </View>

          {/* Kategória szűrők (Food, Drinks, Desserts) */}
          <View style={styles.filterRow}>
            {['Food', 'Drinks', 'Desserts'].map(category => (
              <TouchableOpacity 
                key={category} 
                style={[styles.filterPill, activeCategory === category && styles.activePill]}
                onPress={() => setActiveCategory(activeCategory === category ? null : category)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterText, activeCategory === category && styles.filterTextActive]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Ár szűrők */}
          <View style={styles.filterRow}>
            {['$', '$$', '$$$'].map(price => (
              <TouchableOpacity 
                key={price} 
                style={[styles.filterPill, activePrice === price && styles.activePill]}
                onPress={() => setActivePrice(activePrice === price ? null : price)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterText, activePrice === price && styles.filterTextActive]}>
                  {price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Találatok listája */}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <AppBottomNav />
      </View>
    </SafeAreaView>
  );
}