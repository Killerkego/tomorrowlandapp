import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

// Design system colors to match the app
const BG = "#000000";
const WHITE = "#ffffff";
const MUTED = "rgba(255,255,255,0.75)";
const BORDER = "rgba(255,255,255,0.12)";
const GOLD = "#d4af37";
const ACCENT = "#c8417a"; // Keeping the pinkish accent available

export function AppBottomNav() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(width)).current;

  const isHomeActive = pathname === "/" || pathname === "/index";
  const isLineupActive = pathname === "/lineup";
  const isFavoriteActive = pathname === "/favorite";
  const isMapActive = pathname === "/map";
  const isMenuActive = menuVisible;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const handleNavigate = (path: string) => {
    closeMenu();
    // Use a small timeout to let the menu close before navigating
    setTimeout(() => {
      router.push(path as any);
    }, 250);
  };

  // Thematic grouping:
  // 1. Explore (Home, Lineup, Map)
  // 2. Personal (Schedule, Favorites)
  // 3. Experience (Food & Drinks, Tickets)
  // 4. More (Information)
  const menuGroups = [
    [
      { label: "Home", icon: "home-outline", path: "/" },
      { label: "Lineup", icon: "musical-notes-outline", path: "/lineup" },
      { label: "Map", icon: "map-outline", path: "/map" },
    ],
    [
      { label: "My Schedule", icon: "calendar-outline", path: "/schedule" },
      { label: "Favorites", icon: "heart-outline", path: "/favorite" },
    ],
    [
      { label: "Food & Drinks", icon: "restaurant-outline", path: "/gastro" },
      { label: "Tickets", icon: "ticket-outline", path: "/tickets" },
    ],
    [
      {
        label: "Information",
        icon: "information-circle-outline",
        path: "/contact",
      },
      {
        label: "Account",
        icon: "person-outline",
        path: "/login",
      },
    ],
  ];

  return (
    <>
      <View
        style={[
          styles.bottomNav,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons
            name="home-outline"
            size={32}
            color={isHomeActive ? GOLD : WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/lineup")}>
          <Ionicons
            name="musical-notes-outline"
            size={32}
            color={isLineupActive ? GOLD : WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/favorite")}>
          <Ionicons
            name="heart-outline"
            size={32}
            color={isFavoriteActive ? GOLD : WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/map")}>
          <Ionicons
            name="map-outline"
            size={32}
            color={isMapActive ? GOLD : WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openMenu}>
          <Ionicons
            name="menu-outline"
            size={36}
            color={isMenuActive ? GOLD : WHITE}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          {/* Transparent overlay to dismiss menu */}
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          {/* Animated side drawer */}
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: slideAnim }],
                paddingTop: insets.top + 20,
                paddingBottom: insets.bottom + 20,
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity onPress={closeMenu} style={styles.closeBtn}>
                <Ionicons name="close" size={28} color={WHITE} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.menuItemsContainer}
              showsVerticalScrollIndicator={false}
            >
              {menuGroups.map((group, groupIndex) => (
                <View key={`group-${groupIndex}`}>
                  {group.map((item, itemIndex) => {
                    // Speciális kezelés az Account (Profil) oldalhoz
                    const isAccountItem = item.label === "Account";
                    const isActive = isAccountItem 
                      ? (pathname === "/login" || pathname === "/user")
                      : pathname === item.path;
                    
                    const destinationPath = isAccountItem && pathname === "/user" ? "/user" : item.path;

                    return (
                      <TouchableOpacity
                        key={item.path}
                        style={[
                          styles.menuItem,
                          isActive && styles.menuItemActive,
                        ]}
                        onPress={() => handleNavigate(destinationPath)}
                      >
                        <Ionicons
                          name={item.icon as any}
                          size={24}
                          color={isActive ? GOLD : WHITE}
                          style={styles.menuIcon}
                        />
                        <Text
                          style={[
                            styles.menuText,
                            isActive && styles.menuTextActive,
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  {/* Add a divider after each group except the last one */}
                  {groupIndex < menuGroups.length - 1 && (
                    <View style={styles.menuDivider} />
                  )}
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 14,
    minHeight: 62,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: BG,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  drawer: {
    width: width * 0.75, // 75% of screen width
    backgroundColor: "#111111",
    borderLeftWidth: 1,
    borderLeftColor: BORDER,
    shadowColor: "#000",
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  drawerTitle: {
    color: GOLD,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  closeBtn: {
    padding: 4,
  },
  menuItemsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: "rgba(212, 175, 55, 0.1)", // GOLD with opacity
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    color: MUTED,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  menuTextActive: {
    color: GOLD,
    fontWeight: "700",
  },
  menuDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 8,
    marginHorizontal: 12,
  },
});
