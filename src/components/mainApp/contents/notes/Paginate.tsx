import { PaginateProps } from '../../../../types/types';

export const Paginate = ({
	notesPerPage,
	totalNotes,
	currentPage,
	onPaginate,
	onPrev,
	onNext,
}: PaginateProps) => {
	const pageNumbers = [];

	const condition = Math.ceil(totalNotes / notesPerPage);

	for (let i = 1; i <= condition; i++) {
		pageNumbers.push(i);
	}
	const paginateHanlder = (pageNumber: number) => {
		onPaginate(pageNumber);
	};
	const prevPageHanlder = () => {
		onPrev();
	};
	const nextPageHanlder = () => {
		onNext();
	};

	return (
		<div className='w-full flex justify-center gap-2 text-sm md:text-base'>
			<button
				disabled={currentPage === 1}
				onClick={prevPageHanlder}
				className={` rounded-md  p-1 pl-2 pr-2 flex justify-center items-center c transition-colors duration-200 text-blue-700 bg-white ${
					currentPage === 1 ? '' : ' hover:bg-blue-700  hover:text-white cursor-pointer'
				}`}>
				Prev
			</button>

			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => paginateHanlder(number)}
					className={` p-1 pl-2 pr-2  flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-blue-700 hover:text-white rounded-md ${
						currentPage === number ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'
					}`}>
					{number}
				</button>
			))}

			<button
				disabled={currentPage === condition}
				onClick={nextPageHanlder}
				className={` rounded-md  p-1 pl-2 pr-2 flex justify-center items-center c transition-colors duration-200 text-blue-700 bg-white ${
					currentPage === condition ? '' : ' hover:bg-blue-700  hover:text-white cursor-pointer'
				}`}>
				Next
			</button>
		</div>
	);
};
