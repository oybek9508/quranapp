import { useState } from "react";

import { useDispatch } from "react-redux";
import Popover, { ContentSide } from "src/components/common/Popover";

const ReadingViewWordPopover = ({ word, children }) => {
	const [isTooltipOpened, setIsTooltipOpened] = useState(false);
	const dispatch = useDispatch();

	return (
		<Popover
			contentSide={ContentSide.TOP}
			contentSideOffset={-10}
			trigger={
				<div
				//   onMouseEnter={onMouseEnter}
				//   onMouseLeave={onMouseLeave}
				//   onTouchMove={onTouchMove}
				>
					{children}
				</div>
			}
			tip
			isModal
			open={isTooltipOpened}
			//   onOpenChange={onOpenChange}
			//   triggerStyles={styles.trigger}
			//   contentStyles={styles.content}
			defaultStyling={false}
		>
			ReadingViewWordPopover
		</Popover>
	);
};

export default ReadingViewWordPopover;
