import React, {useCallback, useRef} from 'react';
import numeral from 'numeral';
import {dismissEvent} from '../../utils';
import Cloud from './CloudIcon';
import RetweetIcon from './RetweetIcon';
import LikesIcon from './LikesIcons';


const TweetItem = ({_id: uuid, content, creator, date, dateTimestamp, like, user_img: userImgUrl, link }) => {
	const itemRef = useRef({});
	const imgRef = useRef({});

	const goToLink = useCallback(() => {
		window.open(link, '_blank');
	}, [link]);

	const onRemove = useCallback((e) => {
		dismissEvent([imgRef, itemRef], {date: dateTimestamp, type: 'tweet', id: uuid});
		e.stopPropagation();
	}, [itemRef, imgRef, dateTimestamp, uuid]);
	return (
		<div className="item tweet-item" ref={itemRef} onClick={goToLink}>
			<div className="tweet-item-body">
				<img className="tweet-source-img" ref={imgRef} src={userImgUrl} alt={creator} />
				<div className="tweet-content">{content}</div>
				<button className="material-icons" type="button" onClick={onRemove}>cancel</button>
			</div>
			<div className="tweet-footer">
				<div className="likes">
					<span>{numeral(12000).format('0.[00]a')}</span>
					<LikesIcon />
				</div>
				<div className="retweets">
					<span>{numeral(12313000).format('0.[00]a')}</span>
					<RetweetIcon />
				</div>
				<div className="comments">
					<span>{numeral(131).format('0.[00]a')}</span>
					<Cloud />
				</div>
			</div>
		</div>
	);
};

export default TweetItem;
