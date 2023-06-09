import { Note } from '../../../../types/types';
import { useDispatch } from 'react-redux';
import { notesSlice } from '../../../../store/slices/notesSlice';
import { collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { dataBase, auth } from '../../../../config/firebase';
import { DeafultNoteBtns } from './DeafultNoteBtns';
import { TrashNoteBtns } from './TrashNoteBtns';
import { popupSlice } from '../../../../store/slices/popupSlice';
import { motion } from 'framer-motion';
import { noteAnim } from '../../../../animations/animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import favBlack from '../../../../assets/svg/fav-black.svg';

export const NoteCrad = (props: Note) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);
	const today = new Date();
	const createdAt = new Date(props.createdAt);
	const diffTime = Math.abs(today.getTime() - createdAt.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

	const changeFavHandler = async () => {
		dispatch(notesSlice.actions.changeFavState(props.id));
		try {
			await updateDoc(doc(notesColection, props.id), { fav: !props.fav });
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to marked note as a favorite, try again',
					success: false,
				})
			);
		}
	};

	const setDay = (diffDays: number) => {
		switch (true) {
			case diffDays === 0:
				return 'Today';
			case diffDays === 1:
				return 'Yesterday';
			case diffDays >= 2 && diffDays <= 30:
				return `${diffDays} days ago`;
			case diffDays > 30 && diffDays < 365:
				const months = Math.floor(diffDays / 30);
				return `${months} months ago`;
			default:
				const years = Math.floor(diffDays / 365);
				return `${years} years ago`;
		}
	};

	const daysAgo = setDay(diffDays);
	return (
		<motion.div
			layout
			variants={noteAnim}
			initial='hidden'
			animate='visible'
			exit='exit'
			key={props.id}
			className='p-4 shadow-md rounded-md bg-white w-full flex flex-col justify-between text-sm md:text-base h-2/3 md:h-[48%] md:w-2/5  lg:w-5/12  '>
			<div className='flex justify-between items-center border-b pb-3 '>
				<div>
					<h3 className={`${props.color}-text blueText font-semibold`}>{props.title}</h3>
					<h4>{props.category}</h4>
				</div>

				{props.fav && (
					<button disabled={props.inTrash} onClick={changeFavHandler}>
						<FontAwesomeIcon className={`${props.color}-text text-lg md:text-xl`} icon={faHeart} />
					</button>
				)}
				{!props.fav && (
					<button disabled={props.inTrash} onClick={changeFavHandler}>
						<img className='w-4 md:w-5 ' src={favBlack} alt='normal note icon' />{' '}
					</button>
				)}
			</div>

			<div className='border-b h-48 mt-2 mb-2  noscroll flex items-center   overflow-y-scroll text-xs md:text-sm '>
				<p>{props.note}</p>
			</div>
			<div className='flex mt-3 justify-between items-center'>
				{!props.inTrash && <DeafultNoteBtns id={props.id} color={props.color!} />}
				{props.inTrash && <TrashNoteBtns id={props.id} color={props.color!} />}
				<p className='text-xs text-gray-400'>{daysAgo}</p>
			</div>
		</motion.div>
	);
};
