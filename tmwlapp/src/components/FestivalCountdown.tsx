import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View, type ViewStyle } from 'react-native';

import { FESTIVAL_START_DATE } from '@/constants/festival';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

type Props = {
  variant?: 'default' | 'hero';
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());

  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, finished: false };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

type UnitProps = {
  value: number;
  label: string;
  valueSize: number;
  labelSize: number;
  useFlex?: boolean;
  hero?: boolean;
};

function CountdownUnit({ value, label, valueSize, labelSize, useFlex, hero }: UnitProps) {
  const display = label === 'DAYS' ? String(value) : pad(value);

  return (
    <View style={[styles.unit, useFlex && styles.unitFlex]}>
      <Text
        style={[hero ? styles.heroUnitValue : styles.unitValue, { fontSize: valueSize }]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {display}
      </Text>
      <Text
        style={[hero ? styles.heroUnitLabel : styles.unitLabel, { fontSize: labelSize }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export function FestivalCountdown({ variant = 'default' }: Props) {
  const hero = variant === 'hero';
  const { width: screenWidth } = useWindowDimensions();
  const compact = screenWidth < 400;
  const veryCompact = screenWidth < 360;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(FESTIVAL_START_DATE));

  const sizes = useMemo(
    () => ({
      value: hero
        ? veryCompact
          ? 20
          : compact
            ? 24
            : 28
        : veryCompact
          ? 22
          : compact
            ? 26
            : 32,
      label: hero ? (veryCompact ? 7 : 8) : veryCompact ? 8 : 10,
      separator: hero
        ? veryCompact
          ? 16
          : compact
            ? 18
            : 22
        : veryCompact
          ? 18
          : compact
            ? 22
            : 28,
      heading: hero ? (veryCompact ? 9 : 10) : veryCompact ? 11 : compact ? 12 : 13,
      subheading: hero ? (veryCompact ? 8 : 9) : veryCompact ? 9 : 11,
      headingSpacing: hero ? 1.5 : veryCompact ? 1.5 : compact ? 2 : 3,
    }),
    [compact, veryCompact, hero],
  );

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(FESTIVAL_START_DATE));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle: ViewStyle[] = [styles.container, hero ? styles.heroContainer : {}];

  return (
    <View style={containerStyle}>
      {!hero && (
        <>
          <Text
            style={[styles.heading, { fontSize: sizes.heading, letterSpacing: sizes.headingSpacing }]}
            adjustsFontSizeToFit
            numberOfLines={2}
          >
            COUNTDOWN TO TOMORROWLAND
          </Text>
          <Text style={[styles.subheading, { fontSize: sizes.subheading }]} numberOfLines={2}>
            {veryCompact
              ? 'WEEKEND 1 · JUL 17, 2026 · BOOM'
              : 'WEEKEND 1 • JULY 17, 2026 • BOOM, BELGIUM'}
          </Text>
        </>
      )}

      {hero && (
        <Text style={[styles.heroHeading, { fontSize: sizes.heading, letterSpacing: sizes.headingSpacing }]}>
          COUNTDOWN
        </Text>
      )}

      {timeLeft.finished ? (
        <Text style={hero ? styles.heroLiveText : styles.liveText}>THE FESTIVAL HAS BEGUN</Text>
      ) : (
        <View style={[styles.row, hero && styles.heroRow]}>
          <CountdownUnit
            value={timeLeft.days}
            label="DAYS"
            valueSize={sizes.value}
            labelSize={sizes.label}
            useFlex
            hero={hero}
          />
          <Text style={[hero ? styles.heroSeparator : styles.separator, { fontSize: sizes.separator }]}>:</Text>
          <CountdownUnit
            value={timeLeft.hours}
            label="HRS"
            valueSize={sizes.value}
            labelSize={sizes.label}
            useFlex
            hero={hero}
          />
          <Text style={[hero ? styles.heroSeparator : styles.separator, { fontSize: sizes.separator }]}>:</Text>
          <CountdownUnit
            value={timeLeft.minutes}
            label="MIN"
            valueSize={sizes.value}
            labelSize={sizes.label}
            useFlex
            hero={hero}
          />
          <Text style={[hero ? styles.heroSeparator : styles.separator, { fontSize: sizes.separator }]}>:</Text>
          <CountdownUnit
            value={timeLeft.seconds}
            label="SEC"
            valueSize={sizes.value}
            labelSize={sizes.label}
            useFlex
            hero={hero}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    alignItems: 'center',
  },
  heroContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  heading: {
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  heroHeading: {
    color: '#e0e0e0',
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    color: '#a8a8a8',
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  heroRow: {
    maxWidth: 280,
  },
  unit: {
    alignItems: 'center',
  },
  unitFlex: {
    flex: 1,
    minWidth: 0,
  },
  unitValue: {
    color: '#d4af37',
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
  heroUnitValue: {
    color: '#d4af37',
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  unitLabel: {
    color: '#888888',
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
    textAlign: 'center',
  },
  heroUnitLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
    textAlign: 'center',
  },
  separator: {
    color: 'rgba(212, 175, 55, 0.6)',
    fontWeight: '300',
    marginBottom: 14,
    flexShrink: 0,
    width: 8,
    textAlign: 'center',
  },
  heroSeparator: {
    color: 'rgba(212, 175, 55, 0.8)',
    fontWeight: '300',
    marginBottom: 12,
    flexShrink: 0,
    width: 8,
    textAlign: 'center',
  },
  liveText: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    paddingVertical: 8,
  },
  heroLiveText: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    paddingVertical: 8,
  },
});
