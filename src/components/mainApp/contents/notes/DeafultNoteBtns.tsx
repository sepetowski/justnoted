import { collection, doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/notesSlice';
import { popupSlice } from '../../../../store/popupSlice';

interface Props {
	id: string;
}

export const DeafultNoteBtns = ({ id }: Props) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const addToTrashHandler = async () => {
		try {
			await updateDoc(doc(notesColection, id), { inTrash: true });
			dispatch(notesSlice.actions.toogleToTrash(id));
			dispatch(popupSlice.actions.openPopup({ message: 'Added note to trash', success: true }));
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to add to trash, try again',
					success: false,
				})
			);
		}
	};

	return (
		<div className='flex'>
			<Link
				to={`/app/notes/note/${id}`}
				className='bg-blue-700 text-white p-1 pl-2 pr-2 rounded-md min-w-0 flex justify-center items-center'>
				Details
			</Link>

			<button onClick={addToTrashHandler} className='ml-2 border  p-1 rounded-md min-w-0 pl-2 pr-2'>
				Add to trash
			</button>
		</div>
	);
};