import { View } from 'react-native';
import { rSpacing } from '../../utils';
import { TodoCard } from '../../components';
import { Todo } from '../../types/todo';

interface FooterSkeletonProps {
  itemLength?: number;
}

export const FooterSkeleton: React.FC<FooterSkeletonProps> = ({
  itemLength = 1,
}) => {
  return (
    <View style={{ gap: rSpacing(20) }}>
      {Array.from({ length: itemLength }).map((_, index) => (
        <TodoCard
          key={`footer-skeleton-${index}`}
          isLoading={true}
          item={{} as Todo}
        />
      ))}
    </View>
  );
};
