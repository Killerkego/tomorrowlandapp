import { useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Video, ResizeMode, type AVPlaybackStatus } from 'expo-av';

type Size = { width: number; height: number };

type Props = {
  source: number;
};

export function VideoBackground({ source }: Props) {
  const [container, setContainer] = useState<Size>({ width: 0, height: 0 });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainer({ width, height });
  }, []);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      // Status update handler - can be used for debugging if needed
    },
    [],
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      {container.width > 0 && container.height > 0 && (
        <Video
          source={source}
          style={styles.webVideo}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  webVideo: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    width: 0,
    height: 0,
    opacity: 0,
  },
});
