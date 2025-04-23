/**
 * Gestión de Tickets - Funcionalidad JavaScript
 * Sistema elegante y profesional para la gestión de tickets
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar componentes de Bootstrap
    initializeBootstrapComponents();
    
    // Configurar interacciones de la interfaz
    setupUIInteractions();
    
    // Configurar funcionalidades de tickets
    setupTicketFunctionality();
    
    // Configurar formularios
    setupForms();
    
    // Configurar animaciones
    setupAnimations();
    
    console.log('Sistema de Gestión de Tickets inicializado correctamente');
});

/**
 * Inicializa los componentes de Bootstrap
 */
function initializeBootstrapComponents() {
    // Inicializar tooltips
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl, {
                boundary: document.body
            });
        });
    }

    // Inicializar popovers
    if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl, {
                html: true,
                trigger: 'hover focus'
            });
        });
    }
    
    // Auto-ocultar alertas después de 5 segundos
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert && typeof bootstrap !== 'undefined' && bootstrap.Alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            } else if (alert && alert.parentNode) {
                alert.classList.add('fade-out');
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 500);
            }
        }, 5000);
    });
}

/**
 * Configura las interacciones generales de la interfaz
 */
function setupUIInteractions() {
    // Agregar confirmación a los botones de eliminación
    const deleteButtons = document.querySelectorAll('.btn-danger, .btn-delete-confirm');
    deleteButtons.forEach(button => {
        if (!button.hasAttribute('data-bs-toggle')) { // No aplicar a botones de modal
            button.addEventListener('click', function (e) {
                if (this.classList.contains('no-confirm')) return; // Saltar si tiene clase no-confirm
                
                e.preventDefault();
                
                // Crear un modal de confirmación elegante
                const modalId = 'confirmDeleteModal';
                let modal = document.getElementById(modalId);
                
                if (!modal) {
                    // Crear el modal si no existe
                    modal = document.createElement('div');
                    modal.id = modalId;
                    modal.className = 'modal fade';
                    modal.setAttribute('tabindex', '-1');
                    modal.setAttribute('aria-hidden', 'true');
                    
                    modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header bg-danger text-white">
                                    <h5 class="modal-title">
                                        <i class="fas fa-exclamation-triangle me-2"></i>Confirmar eliminación
                                    </h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>¿Está seguro que desea eliminar este elemento? Esta acción no se puede deshacer.</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        <i class="fas fa-times me-2"></i>Cancelar
                                    </button>
                                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">
                                        <i class="fas fa-trash-alt me-2"></i>Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(modal);
                }
                
                // Configurar el modal
                const bsModal = new bootstrap.Modal(modal);
                const confirmBtn = document.getElementById('confirmDeleteBtn');
                
                // Configurar el botón de confirmación
                const originalHref = this.getAttribute('href');
                confirmBtn.addEventListener('click', function () {
                    if (originalHref) {
                        window.location.href = originalHref;
                    } else if (button.form) {
                        button.form.submit();
                    }
                    bsModal.hide();
                }, { once: true });
                
                // Mostrar el modal
                bsModal.show();
            });
        }
    });
    
    // Agregar funcionalidad de búsqueda en tablas
    setupTableSearch();
    
    // Agregar funcionalidad de ordenamiento en tablas
    setupTableSorting();
    
    // Configurar botón de refrescar
    const refreshButtons = document.querySelectorAll('.btn-refresh, #btnRefresh');
    refreshButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i') || this;
            icon.classList.add('fa-spin');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
    });
    
    // Efecto hover para filas de tabla
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.classList.add('bg-light');
        });
        row.addEventListener('mouseleave', function() {
            this.classList.remove('bg-light');
        });
    });
}

/**
 * Configura la funcionalidad de búsqueda en tablas
 */
function setupTableSearch() {
    // Crear campo de búsqueda si no existe
    const tables = document.querySelectorAll('table.table');
    tables.forEach((table, index) => {
        const tableContainer = table.closest('.table-responsive') || table.closest('.card-body');
        
        if (tableContainer && !tableContainer.querySelector('.table-search')) {
            // Verificar si hay suficientes filas para justificar la búsqueda
            const rowCount = table.querySelectorAll('tbody tr').length;
            if (rowCount > 3) {
                const searchId = `searchTable${index}`;
                const searchDiv = document.createElement('div');
                searchDiv.className = 'table-search mb-3';
                searchDiv.innerHTML = `
                    <div class="input-group">
                        <span class="input-group-text bg-primary text-white">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text" class="form-control" id="${searchId}" 
                               placeholder="Buscar en esta tabla..." aria-label="Buscar">
                        <button class="btn btn-outline-secondary clear-search" type="button" title="Limpiar búsqueda">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                
                tableContainer.insertBefore(searchDiv, table);
                
                // Configurar la funcionalidad de búsqueda
                const searchInput = document.getElementById(searchId);
                const clearButton = searchDiv.querySelector('.clear-search');
                
                searchInput.addEventListener('keyup', function() {
                    filterTable(table, this.value);
                    clearButton.style.display = this.value ? 'block' : 'none';
                });
                
                clearButton.style.display = 'none';
                clearButton.addEventListener('click', function() {
                    searchInput.value = '';
                    filterTable(table, '');
                    this.style.display = 'none';
                });
            }
        }
    });
    
    // Configurar búsqueda existente
    const searchInput = document.getElementById('searchTickets');
    if (searchInput) {
        const table = document.querySelector('table');
        searchInput.addEventListener('keyup', function() {
            filterTable(table, this.value);
        });
    }
}

/**
 * Filtra una tabla según el término de búsqueda
 */
function filterTable(table, searchTerm) {
    const term = searchTerm.toLowerCase();
    const rows = table.querySelectorAll('tbody tr');
    let hasVisibleRows = false;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const shouldShow = text.includes(term);
        
        row.style.display = shouldShow ? '' : 'none';
        if (shouldShow) hasVisibleRows = true;
    });
    
    // Mostrar mensaje si no hay resultados
    let noResultsMsg = table.parentNode.querySelector('.no-results-message');
    
    if (!hasVisibleRows && term) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message alert alert-info mt-3';
            noResultsMsg.innerHTML = `
                <i class="fas fa-info-circle me-2"></i>
                No se encontraron resultados para "<strong>${searchTerm}</strong>".
            `;
            table.parentNode.appendChild(noResultsMsg);
        } else {
            noResultsMsg.innerHTML = `
                <i class="fas fa-info-circle me-2"></i>
                No se encontraron resultados para "<strong>${searchTerm}</strong>".
            `;
            noResultsMsg.style.display = 'block';
        }
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

/**
 * Configura el ordenamiento de tablas
 */
function setupTableSorting() {
    // Hacer que los encabezados de tabla sean ordenables si no tienen la clase .no-sort
    const tableHeaders = document.querySelectorAll('table th:not(.no-sort)');
    
    tableHeaders.forEach(header => {
        if (!header.classList.contains('sortable')) {
            header.classList.add('sortable');
            
            // Agregar icono de ordenamiento
            const headerText = header.innerHTML;
            header.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <span>${headerText}</span>
                    <i class="fas fa-sort ms-1 text-muted sort-icon"></i>
                </div>
            `;
            
            // Agregar estilo de cursor
            header.style.cursor = 'pointer';
        }
        
        header.addEventListener('click', function() {
            const table = this.closest('table');
            const index = Array.from(this.parentNode.children).indexOf(this);
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const isAscending = this.classList.contains('asc');
            
            // Actualizar iconos y clases
            tableHeaders.forEach(h => {
                h.classList.remove('asc', 'desc');
                const icon = h.querySelector('.sort-icon');
                if (icon) icon.className = 'fas fa-sort ms-1 text-muted sort-icon';
            });
            
            // Establecer la dirección de ordenamiento
            if (isAscending) {
                this.classList.add('desc');
                const icon = this.querySelector('.sort-icon');
                if (icon) icon.className = 'fas fa-sort-down ms-1 text-primary sort-icon';
            } else {
                this.classList.add('asc');
                const icon = this.querySelector('.sort-icon');
                if (icon) icon.className = 'fas fa-sort-up ms-1 text-primary sort-icon';
            }
            
            // Ordenar las filas
            rows.sort((a, b) => {
                let aValue = a.children[index] ? a.children[index].textContent.trim() : '';
                let bValue = b.children[index] ? b.children[index].textContent.trim() : '';
                
                // Detectar si es una fecha
                if (aValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}/) && bValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}/)) {
                    // Convertir a objetos Date para comparación
                    aValue = new Date(aValue.split('/').reverse().join('/'));
                    bValue = new Date(bValue.split('/').reverse().join('/'));
                    
                    if (isAscending) {
                        return bValue - aValue;
                    } else {
                        return aValue - bValue;
                    }
                }
                
                // Detectar si son números
                if (!isNaN(aValue) && !isNaN(bValue)) {
                    if (isAscending) {
                        return parseFloat(bValue) - parseFloat(aValue);
                    } else {
                        return parseFloat(aValue) - parseFloat(bValue);
                    }
                }
                
                // Comparación de texto
                if (isAscending) {
                    return bValue.localeCompare(aValue, 'es');
                } else {
                    return aValue.localeCompare(bValue, 'es');
                }
            });
            
            // Reordenar las filas en la tabla con animación
            const tbody = table.querySelector('tbody');
            rows.forEach(row => {
                row.style.animation = 'fadeIn 0.5s';
                tbody.appendChild(row);
            });
        });
    });
}

/**
 * Configura funcionalidades específicas para tickets
 */
function setupTicketFunctionality() {
    // Agregar filtros rápidos para tickets
    setupQuickFilters();
    
    // Configurar contadores de tickets
    updateTicketCounters();
}

/**
 * Configura filtros rápidos para tickets
 */
function setupQuickFilters() {
    const ticketTable = document.querySelector('table');
    const cardFooter = document.querySelector('.card-footer');
    
    if (ticketTable && cardFooter) {
        // Verificar si hay suficientes tickets para justificar filtros
        const ticketRows = ticketTable.querySelectorAll('tbody tr');
        
        if (ticketRows.length > 3) {
            // Crear filtros si no existen
            if (!document.querySelector('.quick-filters')) {
                const filtersDiv = document.createElement('div');
                filtersDiv.className = 'quick-filters mt-2';
                filtersDiv.innerHTML = `
                    <div class="d-flex flex-wrap align-items-center">
                        <span class="me-2 text-muted">Filtros rápidos:</span>
                        <button class="btn btn-sm btn-outline-primary me-1 mb-1" data-filter="all">
                            <i class="fas fa-list me-1"></i>Todos
                        </button>
                        <button class="btn btn-sm btn-outline-warning me-1 mb-1" data-filter="Pendiente">
                            <i class="fas fa-clock me-1"></i>Pendientes
                        </button>
                        <button class="btn btn-sm btn-outline-primary me-1 mb-1" data-filter="EnProgreso">
                            <i class="fas fa-spinner me-1"></i>En Progreso
                        </button>
                        <button class="btn btn-sm btn-outline-success me-1 mb-1" data-filter="Completado">
                            <i class="fas fa-check-circle me-1"></i>Completados
                        </button>
                    </div>
                `;
                
                cardFooter.appendChild(filtersDiv);
                
                // Configurar funcionalidad de filtros
                const filterButtons = filtersDiv.querySelectorAll('button');
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Actualizar estado activo de los botones
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        
                        const filter = this.getAttribute('data-filter');
                        
                        // Aplicar filtro
                        ticketRows.forEach(row => {
                            if (filter === 'all') {
                                row.style.display = '';
                            } else {
                                const statusCell = row.querySelector('td:nth-child(2)');
                                if (statusCell && statusCell.textContent.includes(filter)) {
                                    row.style.display = '';
                                } else {
                                    row.style.display = 'none';
                                }
                            }
                        });
                    });
                });
                
                // Activar el filtro "Todos" por defecto
                filterButtons[0].classList.add('active');
            }
        }
    }
}

/**
 * Actualiza los contadores de tickets
 */
function updateTicketCounters() {
    const ticketCounters = document.querySelectorAll('.ticket-counter');
    
    if (ticketCounters.length > 0) {
        // Animar contadores
        ticketCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            let count = 0;
            const duration = 1000; // 1 segundo
            const interval = 50; // 50ms entre actualizaciones
            const steps = duration / interval;
            const increment = target / steps;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(count);
                }
            }, interval);
        });
    }
}

/**
 * Configura mejoras para formularios
 */
function setupForms() {
    // Mejorar campos de formulario
    enhanceFormFields();
    
    // Configurar validación de formularios
    setupFormValidation();
    
    // Configurar campos adicionales
    setupToggleFields();
}

/**
 * Mejora los campos de formulario con efectos visuales
 */
function enhanceFormFields() {
    // Agregar efectos de enfoque a los campos
    const formControls = document.querySelectorAll('.form-control, .form-select');
    
    formControls.forEach(control => {
        // Efecto de enfoque
        control.addEventListener('focus', function() {
            this.closest('.form-group')?.classList.add('focused');
            this.classList.add('border-primary');
        });
        
        control.addEventListener('blur', function() {
            this.closest('.form-group')?.classList.remove('focused');
            this.classList.remove('border-primary');
        });
        
        // Verificar si el campo ya tiene valor
        if (control.value) {
            control.closest('.form-group')?.classList.add('has-value');
        }
        
        control.addEventListener('input', function() {
            if (this.value) {
                this.closest('.form-group')?.classList.add('has-value');
            } else {
                this.closest('.form-group')?.classList.remove('has-value');
            }
        });
    });
    
    // Mejorar campos de selección
    const selects = document.querySelectorAll('select.form-select');
    
    selects.forEach(select => {
        // Colorear opciones según su valor
        const options = select.querySelectorAll('option');
        
        options.forEach(option => {
            const value = option.value.toLowerCase();
            
            if (value.includes('completado') || value.includes('baja')) {
                option.classList.add('text-success');
            } else if (value.includes('enprogreso') || value.includes('media')) {
                option.classList.add('text-primary');
            } else if (value.includes('pendiente') || value.includes('alta')) {
                option.classList.add('text-warning');
            } else if (value.includes('cancelado') || value.includes('critica')) {
                option.classList.add('text-danger');
            }
        });
    });
}

/**
 * Configura la validación de formularios
 */
function setupFormValidation() {
    // Validar formularios al enviar
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Mostrar mensajes de error
                const invalidFields = this.querySelectorAll(':invalid');
                
                invalidFields.forEach(field => {
                    // Resaltar campo inválido
                    field.classList.add('is-invalid');
                    
                    // Crear mensaje de error si no existe
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('invalid-feedback')) {
                        const feedback = document.createElement('div');
                        feedback.className = 'invalid-feedback';
                        feedback.textContent = field.validationMessage;
                        field.parentNode.insertBefore(feedback, field.nextSibling);
                    }
                });
                
                // Desplazarse al primer campo inválido
                if (invalidFields.length > 0) {
                    invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    invalidFields[0].focus();
                }
            } else {
                // Mostrar indicador de carga
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Procesando...';
                    submitBtn.disabled = true;
                    
                    // Restaurar después de 10 segundos si el formulario no se envía
                    setTimeout(() => {
                        if (document.body.contains(submitBtn)) {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }
                    }, 10000);
                }
            }
            
            this.classList.add('was-validated');
        });
        
        // Validar campos al cambiar
        const formFields = form.querySelectorAll('input, select, textarea');
        
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
    });
}

/**
 * Configura campos adicionales en formularios
 */
function setupToggleFields() {
    // Funcionalidad para mostrar/ocultar campos adicionales
    const toggleFields = document.querySelectorAll('.toggle-fields');
    
    toggleFields.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Alternar visibilidad con animación
                if (targetElement.classList.contains('show')) {
                    targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
                    setTimeout(() => {
                        targetElement.style.maxHeight = '0';
                    }, 10);
                    setTimeout(() => {
                        targetElement.classList.remove('show');
                        this.innerHTML = '<i class="fas fa-plus-circle me-2"></i>Mostrar campos adicionales';
                    }, 300);
                } else {
                    targetElement.classList.add('show');
                    targetElement.style.maxHeight = '0';
                    setTimeout(() => {
                        targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
                    }, 10);
                    this.innerHTML = '<i class="fas fa-minus-circle me-2"></i>Ocultar campos adicionales';
                }
            }
        });
    });
}

/**
 * Configura animaciones para la interfaz
 */
function setupAnimations() {
    // Animación de entrada para elementos principales
    const mainElements = document.querySelectorAll('.card, .alert, h1, .table-responsive');
    
    mainElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}
