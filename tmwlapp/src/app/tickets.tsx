import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { styles } from './tickets.styles';
import { GOLD } from './login.styles';

const TICKET_TYPES = [
  {
    id: 'full-madness',
    title: 'Full Madness Pass',
    label: 'Festival Only',
    price: '€355',
    description: 'Access to Tomorrowland on Friday, Saturday and Sunday (Full Weekend).',
    image: require('../../assets/images/Full_madness_pass.jpg'),
    features: ['3 Days Access', 'All Stages', 'Tomorrowland Gift'],
  },
  {
    id: 'dreamville',
    title: 'Magnificent Greens',
    label: 'Camping + Festival',
    price: '€435',
    description: 'Includes a Full Madness Pass and 5 days of camping at DreamVille with all its magic.',
    image: require('../../assets/images/dreamville_ticket.jpg'),
    features: ['5 Days Camping', 'The Gathering Party', 'Marketplace Access'],
  },
  {
    id: 'day-pass',
    title: 'Day Pass',
    label: 'Single Day',
    price: '€125',
    description: 'Experience the magic of Tomorrowland for one incredible day of your choice.',
    image: require('../../assets/images/day_pass.jpg'),
    features: ['1 Day Access', 'Friday, Sat or Sun', 'Locker Available'],
  },
];

export default function TicketsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safeArea}>
      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/images/ticket.jpg')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)', '#000000']}
            style={styles.gradientOverlay}
          />

          <View style={{ position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 10 }}>
            <AppHeader />
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Tickets &{"\n"}Passes</Text>
          </View>
        </View>

        {/* TICKETS LIST */}
        <View style={styles.container}>
          {TICKET_TYPES.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <Image source={ticket.image} style={styles.ticketImage} contentFit="cover" />
              
              <View style={styles.ticketInfo}>
                <View style={styles.ticketHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.ticketLabel}>{ticket.label}</Text>
                    <Text style={styles.ticketTitle}>{ticket.title}</Text>
                  </View>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>{ticket.price}</Text>
                  </View>
                </View>

                <Text style={styles.description}>{ticket.description}</Text>

                <View style={styles.featuresContainer}>
                  {ticket.features.map((feature, index) => (
                    <View key={index} style={styles.featureTag}>
                      <Ionicons name="checkmark-circle" size={14} color={GOLD} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.buyButton} activeOpacity={0.7}>
                  <Text style={styles.buyButtonText}>Get Tickets</Text>
                  <Ionicons name="arrow-forward" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <AppBottomNav />
    </View>
  );
}
