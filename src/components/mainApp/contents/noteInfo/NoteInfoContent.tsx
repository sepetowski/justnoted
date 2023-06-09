import { useParams } from 'react-router-dom';
import { ContentWrapper } from '../../../ui/ContentWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { H2 } from '../../../ui/H2';
import { NoteInfo } from './NoteInfo';
import { useState } from 'react';
import { EditNote } from './EditNote';
import { EditHistory } from './EditHistory';

export const NoteInfoContent = () => {
	const params = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const [editingNoteColor, setEditingNoteColor] = useState('');
	const notes = useSelector((state: RootState) => state.notes.notes);
	const noteId = params.noteId;
	const noteInfo = notes.filter((note) => noteId === note.id).at(0)!;

	const changeColorHandler = (currColor: string) => {
		setEditingNoteColor(currColor);
	};

	const openEditHandler = () => {
		setIsEditing(true);
	};
	const closeEditHandler = (isSaved: boolean) => {
		if (!isSaved) setEditingNoteColor(noteInfo.color);
		setIsEditing(false);
	};

	return (
		<ContentWrapper hasHeader={false}>
			<div className='w-full h-full lg:h-full flex flex-col lg:flex-row  gap-5 lg:gap-10 text-sm lg:text-base'>
				<div className='w-full lg:w-3/5  h-full flex flex-col justify-center'>
					<H2 title='Your Note' />
					<div
						className={`  flex flex-col bg-white w-full shadow-lg rounded-lg mt-12 p-4  ${
							isEditing
								? 'justify-center min-h-0 overflow-y-auto'
								: 'justify-between min-h-[22rem] md:min-h-[20rem] lg:min-h-[23rem]'
						}`}>
						{!isEditing && <NoteInfo noteInfo={noteInfo} onOpenEdit={openEditHandler} />}
						{isEditing && (
							<EditNote
								noteInfo={noteInfo}
								onCloseEdit={closeEditHandler}
								onChangeColor={changeColorHandler}
							/>
						)}
					</div>
				</div>
				<div className='w-full lg:w-2/5 h-full flex flex-col justify-center '>
					<H2 title='History' />

					<EditHistory noteInfo={noteInfo} newColor={editingNoteColor} />
				</div>
			</div>
		</ContentWrapper>
	);
};
