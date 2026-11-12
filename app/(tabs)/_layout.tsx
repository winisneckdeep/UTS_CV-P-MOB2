import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../constants/design';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const showBrand = width >= 760;

  return (
    <Tabs
      tabBar={(props) => (
        <View style={[styles.tabBar, { height: 64 + insets.top, paddingTop: insets.top }]}>
          <Svg
            width={width}
            height={64 + insets.top}
            viewBox={`0 0 ${width} ${64 + insets.top}`}
            style={StyleSheet.absoluteFill}
            preserveAspectRatio="none"
          >
            <Defs>
              <LinearGradient id="appTabGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={Colors.gradients.dark[0]} />
                <Stop offset="100%" stopColor={Colors.gradients.dark[1]} />
              </LinearGradient>
            </Defs>
            <Rect width={width} height={64 + insets.top} fill="url(#appTabGradient)" />
          </Svg>
          {showBrand && <Text style={styles.brand}>PERSONAL CV</Text>}
          <View style={[styles.tabItems, showBrand && styles.tabItemsWithBrand]}>
            {props.state.routes.map((route, index) => {
              const { options } = props.descriptors[route.key];
              const focused = props.state.index === index;
              const color = focused ? Colors.text.inverse : Colors.primary[200];
              const label =
                typeof options.tabBarLabel === 'string'
                  ? options.tabBarLabel
                  : options.title ?? route.name;
              const icon = options.tabBarIcon?.({ focused, color, size: 23 });

              return (
                <Pressable
                  key={route.key}
                  accessibilityRole="tab"
                  accessibilityState={focused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                  testID={options.tabBarButtonTestID}
                  onPress={() => {
                    const event = props.emitter.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });

                    if (!focused && !event.defaultPrevented) {
                      props.navigateToTab(route.key);
                    }
                  }}
                  onLongPress={() =>
                    props.emitter.emit({
                      type: 'tabLongPress',
                      target: route.key,
                    })
                  }
                  style={styles.tabItem}
                >
                  {icon}
                  <Text style={styles.tabLabel}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      screenOptions={{
        tabBarPosition: 'top',
        tabBarActiveTintColor: Colors.text.inverse,
        tabBarInactiveTintColor: Colors.primary[200],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={typeof color === 'string' ? color : Colors.primary[600] as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Tentang',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={typeof color === 'string' ? color : Colors.primary[600] as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={typeof color === 'string' ? color : Colors.primary[600] as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portofolio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={typeof color === 'string' ? color : Colors.primary[600] as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="score"
        options={{
          title: 'My Score',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={typeof color === 'string' ? color : Colors.primary[600] as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Kontak',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={typeof color === 'string' ? color : Colors.primary[600] as string} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    height: 64,
    backgroundColor: Colors.gradients.dark[0],
    position: 'relative',
    overflow: 'hidden',
  },
  brand: {
    width: 150,
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: Typography.letterSpacing.wider,
    flexShrink: 0,
  },
  tabItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  tabItemsWithBrand: {
    marginLeft: Spacing.xl,
  },
  tabItem: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: Spacing.xs,
    paddingHorizontal: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.inverse,
  },
});
