// Resume Builder Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const resumeForm = document.getElementById('resumeForm');
    const previewContainer = document.getElementById('resumePreview');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewBtn = document.getElementById('previewBtn');

    // Form data object to store all resume information
    const resumeData = {
        personalInfo: {},
        summary: '',
        education: [],
        workExperience: [],
        skills: [],
        certifications: [],
        achievements: []
    };

    // Initialize form event listeners
    if (resumeForm) {
        // Personal Information
        resumeForm.addEventListener('input', function(e) {
            if (e.target.name === 'fullName') {
                resumeData.personalInfo.fullName = e.target.value;
            } else if (e.target.name === 'linkedin') {
                resumeData.personalInfo.linkedin = e.target.value;
            } else if (e.target.name === 'email') {
                resumeData.personalInfo.email = e.target.value;
            } else if (e.target.name === 'phone') {
                resumeData.personalInfo.phone = e.target.value;
            } else if (e.target.name === 'summary') {
                resumeData.summary = e.target.value;
            }
            updatePreview();
        });

        // Education - Add new education entry
        document.getElementById('addEducationBtn').addEventListener('click', function() {
            const newEducation = {
                institution: '',
                degree: '',
                dates: '',
                gpa: ''
            };
            resumeData.education.push(newEducation);
            renderEducationForm();
        });

        // Work Experience - Add new experience entry
        document.getElementById('addExperienceBtn').addEventListener('click', function() {
            const newExperience = {
                company: '',
                position: '',
                dates: '',
                location: '',
                responsibilities: ''
            };
            resumeData.workExperience.push(newExperience);
            renderExperienceForm();
        });

        // Skills
        document.getElementById('addSkillBtn').addEventListener('click', addSkill);
        document.getElementById('skillInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addSkill();
        });

        // Certifications
        document.getElementById('addCertificationBtn').addEventListener('click', function() {
            resumeData.certifications.push('');
            renderCertificationsForm();
        });
    }

    // Update the resume preview
    function updatePreview() {
        if (!previewContainer) return;

        let previewHTML = `
            <div class="p-8 bg-white">
                <!-- Header -->
                <div class="border-b-2 border-gray-200 pb-4 mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">${resumeData.personalInfo.fullName || 'Your Name'}</h1>
                    <div class="flex flex-wrap gap-x-4 text-gray-600">
                        ${resumeData.personalInfo.linkedin ? `<span><i class="fab fa-linkedin mr-1"></i> ${resumeData.personalInfo.linkedin}</span>` : ''}
                        ${resumeData.personalInfo.email ? `<span><i class="fas fa-envelope mr-1"></i> ${resumeData.personalInfo.email}</span>` : ''}
                        ${resumeData.personalInfo.phone ? `<span><i class="fas fa-phone mr-1"></i> ${resumeData.personalInfo.phone}</span>` : ''}
                    </div>
                </div>

                <!-- Summary -->
                ${resumeData.summary ? `
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-2">SUMMARY</h2>
                    <p class="text-gray-700">${resumeData.summary}</p>
                </div>
                ` : ''}

                <!-- Education -->
                ${resumeData.education.length > 0 ? `
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-2">EDUCATION</h2>
                    ${resumeData.education.map(edu => `
                        <div class="mb-4">
                            <div class="flex justify-between">
                                <h3 class="font-bold text-gray-800">${edu.institution || 'Institution'}</h3>
                                <span class="text-gray-600">${edu.dates || 'Dates'}</span>
                            </div>
                            <p class="text-gray-700">${edu.degree || 'Degree'}</p>
                            ${edu.gpa ? `<p class="text-gray-600">GPA: ${edu.gpa}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                <!-- Work Experience -->
                ${resumeData.workExperience.length > 0 ? `
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-2">WORK EXPERIENCE</h2>
                    ${resumeData.workExperience.map(exp => `
                        <div class="mb-4">
                            <div class="flex justify-between">
                                <h3 class="font-bold text-gray-800">${exp.company || 'Company'}</h3>
                                <span class="text-gray-600">${exp.dates || 'Dates'}</span>
                            </div>
                            <div class="flex justify-between text-gray-700 mb-1">
                                <span>${exp.position || 'Position'}</span>
                                <span>${exp.location || 'Location'}</span>
                            </div>
                            <p class="text-gray-700">${exp.responsibilities || 'Responsibilities'}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                <!-- Skills -->
                ${resumeData.skills.length > 0 ? `
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-2">SKILLS</h2>
                    <div class="flex flex-wrap gap-2">
                        ${resumeData.skills.map(skill => `
                            <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">${skill}</span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Certifications -->
                ${resumeData.certifications.length > 0 ? `
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-2">CERTIFICATIONS</h2>
                    <ul class="list-disc list-inside text-gray-700">
                        ${resumeData.certifications.map(cert => `
                            <li>${cert || 'Certification'}</li>
                        `).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;

        previewContainer.innerHTML = previewHTML;
    }

    // Add skill to resume data
    function addSkill() {
        const skillInput = document.getElementById('skillInput');
        const skill = skillInput.value.trim();
        
        if (skill && !resumeData.skills.includes(skill)) {
            resumeData.skills.push(skill);
            renderSkills();
            skillInput.value = '';
            updatePreview();
        }
    }

    // Render skills in the form
    function renderSkills() {
        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = resumeData.skills.map(skill => `
            <div class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                ${skill}
                <button class="ml-2 text-purple-600 hover:text-purple-800 remove-skill" data-skill="${skill}">
                    <i class="fas fa-times text-xs"></i>
                </button>
            </div>
        `).join('');

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-skill').forEach(btn => {
            btn.addEventListener('click', function() {
                const skillToRemove = this.getAttribute('data-skill');
                resumeData.skills = resumeData.skills.filter(s => s !== skillToRemove);
                renderSkills();
                updatePreview();
            });
        });
    }

    // PDF Generation (using jsPDF)
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // In a real implementation, we would use jsPDF to generate a PDF
            alert('PDF generation would be implemented here with jsPDF in a production environment');
        });
    }

    // Initial render
    updatePreview();
});

// Helper function to generate unique IDs
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}