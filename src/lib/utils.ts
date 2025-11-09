export function isValidUrl(string: string) {
	try {
		new URL(string);
		return true;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		return false;
	}
}

export const projectStatuses = {
	building: 'Building',
	submitted: 'Submitted',
	t1_approved: 'Approved (1)',
	t2_approved: 'Approved (2)',
	finalized: 'Finalized',
	rejected: 'Rejected',
	rejected_locked: 'Rejected (locked)'
};
