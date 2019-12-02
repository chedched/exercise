import { TestBed } from '@angular/core/testing';
import { FilesService } from './files.service';

describe('FilesService', () => {
	
	let filesService: FilesService;
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FilesService]
		});

		filesService = TestBed.get(FilesService);
	});

	it('should be created', () => {
		expect(filesService).toBeTruthy();
	});


});


/*

// Add tests for all() method
describe('all', () => {
	it('should return a collection of files', () => {
		const fileResponse = [
			'foo/javascript/test.js',
			'bar/java/is_an_island.java',
			'fighters/html/rip_netscape.html'
		];
		let response;
		spyOn(filesService, 'all').and.returnValue(of(fileResponse));

		filesService.all().subscribe(res => {
			expect(response).toEqual(fileResponse);
		});

	});
  });
*/